import { NextRequest, NextResponse } from 'next/server'
import { useRouter } from 'next/router'
import { Post, Prisma, PrismaClient, Role, User } from 'database'
import { discordPostUpload } from '../../../src/services/discord'
import prisma from 'lib/prisma'
import { ArrayElement, PostPatchRequest, RequiredKeys } from 'types'
import { isAuthorized } from 'src/services/authorization'

// can't use shared import
export const config = {
  runtime: 'experimental-edge',
  regions: ['cdg1', 'gru1', 'iad1'],
}

const moderatorFields: Array<keyof PostPatchRequest> = ['pinned', 'isModerated', 'categories']

export default async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const postId = searchParams.get('postId')
  if (!postId || !Number.isInteger(Number(postId))) {
    return new Response('invalid post id', { status: 422 })
  }
  // individual post visualization when clicking on post or visiting it
  // (visit renders same thing as modal, which should include moderation actions, etc. already)
  // This is the only route that will GET discord embed by message id to save
  //  some space and avoid waiting for embed generation upon post creation
  try {
    switch (req.method) {
      case 'PATCH': {
        const headerTwitchId = req.headers.get('X-twitch-id') ?? ''
        let payload: PostPatchRequest
        try {
          payload = await req.json()
          console.log(payload)
        } catch (error) {
          return new Response('missing payload', { status: 400 })
        }
        const user = await prisma.user.findFirst({ where: { twitchId: headerTwitchId } })
        if (!user) {
          return new Response('unauthenticated', { status: 401 })
        }

        let requiredRole: Role = 'USER'
        if (Object.keys(payload).some((k: any) => moderatorFields.includes(k))) {
          requiredRole = 'MODERATOR'
        }

        if (!isAuthorized(user, requiredRole)) {
          return new Response('unathorized', { status: 403 })
        }

        // eslint-disable-next-line prefer-const
        let { liked, saved, ...postUpdate } = payload
        postUpdate = {
          ...postUpdate,
          ...(postUpdate.isModerated !== undefined && { isModerated: postUpdate.isModerated }),
          ...(postUpdate.pinned !== undefined && { pinned: postUpdate.pinned }),
        }

        if (saved !== undefined) {
          if (!saved) {
            try {
              await prisma.savedPost.delete({
                where: {
                  userId_postId: {
                    postId: Number(postId),
                    userId: user.id,
                  },
                },
              })
            } catch (error) {
              console.log(error)
            }
          } else {
            await prisma.savedPost.create({
              data: {
                postId: Number(postId),
                userId: user.id,
              },
            })
          }

          return new Response(null, { status: 204 })
        }

        if (liked !== undefined) {
          if (!liked) {
            try {
              await prisma.likedPost.delete({
                where: {
                  userId_postId: {
                    postId: Number(postId),
                    userId: user.id,
                  },
                },
              })
            } catch (error) {
              console.log(error)
            }
          } else {
            await prisma.likedPost.create({
              data: {
                postId: Number(postId),
                userId: user.id,
              },
            })
          }

          return new Response(null, { status: 204 })
        }

        const post = await prisma.post.findUnique({
          where: {
            id: Number(postId),
          },
        })
        if (post?.userId !== user.id && !isAuthorized(user, 'MODERATOR')) {
          return new Response("cannot update another user's post", { status: 403 })
        }
        const updatedPost = await prisma.post.update({
          data: postUpdate,
          where: {
            id: Number(postId),
          },
        })

        return new Response(JSON.stringify(updatedPost), { status: 200 })
      }
      case 'DELETE': {
        const headerTwitchId = req.headers.get('X-twitch-id') ?? ''
        const user = await prisma.user.findFirst({ where: { twitchId: headerTwitchId } })
        if (!user) {
          return new Response('unauthenticated', { status: 401 })
        }
        const post = await prisma.post.findUnique({
          where: {
            id: Number(postId),
          },
        })
        if (post?.userId !== user.id && !isAuthorized(user, 'MODERATOR')) {
          return new Response("cannot delete another user's post", { status: 403 })
        }
        await prisma.post.delete({
          where: { id: Number(postId) },
          select: null,
        })

        return new Response(null, { status: 204 })
      }
    }
  } catch (error: any) {
    if (!error) return new Response('internal server error', { status: 500 })

    try {
      if (error?.message) {
        console.log('error.message')
        console.log(error.message.match(/Argument .*/g))
      }
    } catch (error) {}
    console.log(error)
    return new Response(JSON.stringify(error), { status: 500 })
  }
}
