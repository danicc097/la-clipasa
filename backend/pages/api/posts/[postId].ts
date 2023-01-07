import { NextRequest, NextResponse } from 'next/server'
import { useRouter } from 'next/router'
import { Post, Prisma, PrismaClient } from 'database'
import { discordPostUpload } from '../../../src/services/discord'
import prisma from '../../../lib/prisma'

// can't use shared import
export const config = {
  runtime: 'experimental-edge',
  regions: ['cdg1', 'gru1', 'iad1'],
}

export default async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const postId = searchParams.get('postId')

  if (!Number.isInteger(postId)) {
    return new Response(JSON.stringify('invalid post id'), { status: 422 })
  }
  // individual post visualization when clicking on post or visiting it
  // (visit renders same thing as modal, which should include moderation actions, etc. already)
  // This is the only route that will GET discord embed by message id to save
  //  some space and avoid waiting for embed generation upon post creation
  try {
    switch (req.method) {
      case 'PATCH': {
        let payload: Prisma.PostUncheckedUpdateInput
        try {
          payload = await req.json()
          console.log(payload)
        } catch (error) {
          return new Response('missing payload', { status: 400 })
        }
        // will also use this route to moderate, pin messages.
        // if payload contains `pinned`, `moderated` -> find user by twitch id and
        // add to update data else ignore and save up that call
        // we dont really need user to be follower or subscriber for basic
        // post upload.

        const post = await prisma.post.update({ data: payload, where: { id: Number(postId) } }) // obviously must explicitly set fields later

        // await discordPostUpload(post)

        return new Response(JSON.stringify(post), { status: 201 })
      }
      case 'DELETE': {
        await prisma.post.delete({
          where: { id: Number(postId) },
          select: null,
        })

        return new Response(null, { status: 204 })
      }
    }
  } catch (error) {}
}
