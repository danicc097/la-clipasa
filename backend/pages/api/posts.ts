import { NextRequest } from 'next/server'
import { PostCategory, User } from 'database'
import { PostCreateRequest, PostQueryParams, PostQueryParamsSort, PostsGetResponse, SortDirection } from 'types'
import prisma from 'lib/prisma'
import { isAuthorized } from 'src/services/authorization'

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

const DEFAULT_LIMIT = 10

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
          sort: (searchParams.get('sort') as PostQueryParamsSort) ?? undefined,
          sortDirection: (searchParams.get('sortDirection') as SortDirection) ?? SortDirection.DESC,
        }

        // TODO shared paackage "validation"
        // if (queryParams.categories) {
        //   const postCategoriesError = validatePostCategories(queryParams.categories)
        //   if (postCategoriesError !== null) return new Response(postCategoriesError, { status: 422 })
        // }

        let limit = queryParams.limit ?? DEFAULT_LIMIT
        if (limit > 20) {
          limit = 20
        }

        if (queryParams.authorId && user?.id && queryParams.authorId === user?.id) {
          // so that a user can see posts pending moderation
          queryParams.moderated = undefined
        }

        const posts = await prisma.post.findMany({
          take: limit + 1,
          // take: -limit, // paging backwards
          // ...(queryParams.cursor !== undefined && { skip: 1 }), // skip the cursor`
          skip: 0,
          orderBy: {
            createdAt: queryParams.sortDirection,
          },
          // NOTE: cursor pagination does not use cursors in the underlying database (PostgreSQL).
          // also `cursor` will only work with `id`, but need gt/lt workaround for dates, even if unique
          // ...(queryParams.cursor !== undefined && {
          //   cursor: {
          //     createdAt: queryParams.cursor, // wont work since cursor is not matching any rows --> we're using Timestamptz
          //   },
          // }),
          where: {
            ...(queryParams.cursor !== undefined && {
              createdAt: {
                lte: new Date(queryParams.cursor), // older records (less than/equal). equal accounts for cursor
              },
            }),
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
              }, // filter by arbitrary user and "My posts"
            }),
            ...(queryParams.liked !== undefined &&
              user && {
                likedPosts: {
                  some: {
                    userId: { equals: user.id },
                  },
                },
              }),
            ...(queryParams.saved !== undefined &&
              user && {
                savedPosts: {
                  some: {
                    userId: { equals: user.id },
                  },
                },
              }),
          },
          include: {
            ...(user && {
              likedPosts: {
                where: {
                  userId: { equals: user?.id },
                },
              },
            }), // length > 0 if user liked
            ...(user && {
              savedPosts: {
                where: {
                  userId: { equals: user?.id },
                },
              },
            }), // length > 0 if user saved
            User: {
              select: { id: true, displayName: true, profileImage: true },
            }, // minimal author info to display
            _count: {
              select: { likedPosts: true }, // total likes
            },
          },
        })

        let prevCursor: Date | undefined = undefined
        const hasNextPage = posts.length > limit
        if (hasNextPage) {
          // there's at least 1 more post
          const lastExtra = posts.pop()
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          prevCursor = lastExtra!.createdAt
          console.log(JSON.stringify(lastExtra))
        }

        const resBody: PostsGetResponse = {
          data: posts,
          // assume there is a next page
          ...(hasNextPage && prevCursor && { nextCursor: prevCursor.toISOString() }),
        }
        /**
          TODO:
          format response as per https://codesandbox.io/s/github/tanstack/query/tree/main/examples/react/load-more-infinite-scroll?from-embed=&file=/pages/index.js:789-806
          and update to useInfiniteQuery and new response type
        */

        console.log('resBody.data.length')
        console.log(resBody.data.length)

        return new Response(JSON.stringify(resBody), {
          status: 200,
        })
      }
      case 'POST': {
        const headerTwitchId = req.headers.get('X-twitch-id')
        if (!headerTwitchId) return new Response('unauthenticated', { status: 401 })

        const user = await prisma.user.findFirst({ where: { twitchId: headerTwitchId } })
        if (!user) return new Response('unauthenticated', { status: 401 })

        // curl -X POST "https://edge-functions-backend.vercel.app/api/posts"  -H 'Authorization: Bearer 1btt566hxkovfzn4qwt2a6h8sdotnk' -H 'Client-Id: r2r4w2bedvlt0qmfexgpnzqvv1ymfq' -d '{"title":"title", "link":"link", "content":"content", "userId": "a32065f5-fc9e-4dfd-b292-4709d211a86c"}'
        let payload: PostCreateRequest
        try {
          payload = await req.json()
          console.log(payload)
        } catch (error) {
          return new Response('missing payload', { status: 400 })
        }

        // allow mods to restore deleted posts
        if (payload.userId && payload.userId !== user?.twitchId && !isAuthorized(user, 'MODERATOR')) {
          return new Response(JSON.stringify('cannot post as a different user'), { status: 403 })
        }

        const post = await prisma.post.create({
          data: {
            link: payload.link,
            title: payload.title,
            content: payload.content,
            userId: payload.userId ?? user.id,
          },
        })

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
