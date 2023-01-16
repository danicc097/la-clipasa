import { NextRequest, NextResponse } from 'next/server'
import { useRouter } from 'next/router'
import { PostCategory, Prisma, PrismaClient, User } from 'database'
import { PostCategoryNames, PostQueryParams } from 'types'
import { cursorTo } from 'readline'
import prisma from 'lib/prisma'

// TODO https://github.com/prisma/prisma/issues/6219#issuecomment-1264724714
// https://github.com/prisma/prisma/issues/10305#issuecomment-1148988650
// https://www.prisma.io/blog/database-access-on-the-edge-8F0t1s1BqOJE?utm_source=summari
// need data proxy after all, and prisma edge library if using edge functions
// see https://github.com/prisma/prisma/issues/11712
// Prisma's Data Proxy allows connecting to a database via HTTP (Prisma proxies HTTP to a regular TCP database connection).
// Cloudflare Workers (or Functions) can't make TCP connections directly and databases
// can't make HTTP connections by default (only way is an external service such as Postgrest or Data Proxy),
// so the only way is to use the Data Proxy to connect via HTTP.

// can't use shared import
export const config = {
  runtime: 'experimental-edge',
  regions: ['cdg1', 'gru1', 'iad1'],
}

export default async (req: NextRequest) => {
  try {
    switch (req.method) {
      case 'GET': {
        const headerTwitchId = req.headers.get('X-twitch-id')

        let user: User | null = null
        if (headerTwitchId) {
          user = await prisma.user.findFirst({ where: { twitchId: headerTwitchId } })
        }

        const { searchParams } = new URL(req.url)

        // https://www.prisma.io/docs/concepts/components/prisma-client/null-and-undefined
        const queryParams: PostQueryParams = {
          titleQuery: searchParams.get('titleQuery') ?? undefined,
          limit: searchParams.get('limit') !== null ? Number(searchParams.get('limit')) : undefined,
          cursor: searchParams.get('cursor') !== null ? searchParams.get('cursor') ?? undefined : undefined,
          authorId: searchParams.get('authorId') ?? undefined,
          liked: searchParams.get('liked') !== null ? String(searchParams.get('liked')) === 'true' : undefined,
          saved: searchParams.get('saved') !== null ? String(searchParams.get('saved')) === 'true' : undefined,
          moderated:
            searchParams.get('moderated') !== null ? String(searchParams.get('moderated')) === 'true' : undefined,
          categories:
            searchParams.getAll('categories')?.length > 0
              ? (searchParams.getAll('categories').filter((c) => (PostCategory as any)[c]) as PostCategory[])
              : undefined,
        }

        const DEFAULT_LIMIT = 10
        console.log(queryParams.categories)
        // all posts with infinite scroll (https://react-query-v3.tanstack.com/guides/infinite-queries)
        const posts = await prisma.post.findMany({
          take: queryParams.limit ?? DEFAULT_LIMIT,
          ...(queryParams.cursor !== undefined && { skip: 1 }), // skip the cursor
          orderBy: {
            createdAt: 'desc',
          },
          // NOTE: cursor pagination does not use cursors in the underlying database (PostgreSQL).
          ...(queryParams.cursor !== undefined && {
            cursor: {
              createdAt: queryParams.cursor,
            },
          }),
          where: {
            ...(queryParams.moderated !== undefined && {
              isModerated: queryParams.moderated,
            }),
            ...(queryParams.titleQuery !== undefined &&
              queryParams.titleQuery !== '' && {
                title: {
                  search: queryParams.titleQuery,
                },
              }),
            ...(queryParams.categories !== undefined && {
              categories: {
                hasEvery: queryParams.categories,
              },
            }),
            ...(queryParams.authorId !== undefined && {
              userId: {
                equals: queryParams.authorId,
              }, // filter by arbitrary user and "Edit my posts"
            }),
            ...(queryParams.liked !== undefined &&
              user && {
                likedPost: {
                  some: {
                    userId: { equals: user.id },
                  },
                },
              }),
            ...(queryParams.saved !== undefined &&
              user && {
                savedPost: {
                  some: {
                    userId: { equals: user.id },
                  },
                },
              }),
          },
          include: {
            likedPosts: {
              where: {
                userId: { equals: user?.id },
              },
            }, // length > 0 if user liked
            savedPosts: {
              where: {
                userId: { equals: user?.id },
              },
            }, // length > 0 if user saved
            User: {
              select: { id: true, displayName: true, profileImage: true },
            }, // minimal author info to display
            _count: {
              select: { likedPosts: true }, // total likes
            },
          },
        })

        /**
          TODO:
          format response as per https://codesandbox.io/s/github/tanstack/query/tree/main/examples/react/load-more-infinite-scroll?from-embed=&file=/pages/index.js:789-806
          and update to useInfiniteQuery and new response type
        */

        return new Response(JSON.stringify(posts), { status: 200 })
      }
      case 'POST': {
        const headerTwitchId = req.headers.get('X-twitch-id')
        if (!headerTwitchId) return new Response('unauthenticated', { status: 401 })

        const user = await prisma.user.findFirst({ where: { twitchId: headerTwitchId } })

        if (headerTwitchId !== user?.twitchId) {
          console.log(`twitch id differs: ${headerTwitchId} - ${user?.twitchId}`)
          return new Response(JSON.stringify('cannot post as a different user'), { status: 403 })
        }

        // curl -X POST "https://edge-functions-backend.vercel.app/api/posts"  -H 'Authorization: Bearer 1btt566hxkovfzn4qwt2a6h8sdotnk' -H 'Client-Id: r2r4w2bedvlt0qmfexgpnzqvv1ymfq' -d '{"title":"title", "link":"link", "content":"content", "userId": "a32065f5-fc9e-4dfd-b292-4709d211a86c"}'
        let payload: Prisma.PostUncheckedCreateInput
        try {
          payload = await req.json()
          console.log(payload)
        } catch (error) {
          return new Response('missing payload', { status: 400 })
        }
        const post = await prisma.post.create({
          data: {
            link: payload.link,
            title: payload.title,
            content: payload.content,
            userId: user.id,
          },
        }) // obviously must explicitly set fields later

        // await discordPostUpload(post)

        return new Response(JSON.stringify(post), { status: 201 })
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
