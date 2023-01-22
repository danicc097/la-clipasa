import { NextRequest } from 'next/server'
import { UserUpdateOrCreateRequest } from 'types'
import prisma from 'lib/prisma'

// can't use shared import
export const config = {
  runtime: 'experimental-edge',
  regions: ['cdg1', 'gru1', 'iad1'],
}

// TODO https://github.com/prisma/prisma/issues/6219#issuecomment-1264724714
// https://github.com/prisma/prisma/issues/10305#issuecomment-1148988650
// https://www.prisma.io/blog/database-access-on-the-edge-8F0t1s1BqOJE?utm_source=summari
// need data proxy after all, and prisma edge library if using edge functions
// see https://github.com/prisma/prisma/issues/11712
// Prisma's Data Proxy allows connecting to a database via HTTP (Prisma proxies HTTP to a regular TCP database connection).
// Cloudflare Workers (or Functions) can't make TCP connections directly and databases
// can't make HTTP connections by default (only way is an external service such as Postgrest or Data Proxy),
// so the only way is to use the Data Proxy to connect via HTTP.

export default async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const twitchId = searchParams.get('twitchId') ?? undefined

  try {
    switch (req.method) {
      // will add moderators and admin by hand in db.
      // no need for PUT/PATCH
      case 'POST': {
        let payload: UserUpdateOrCreateRequest
        try {
          payload = await req.json()
          console.log(payload)
          if (payload.displayName === null) return new Response('displayName is required', { status: 422 })
          if (payload.isFollower === null) return new Response('isFollower is required', { status: 422 })
          if (payload.isSubscriber === null) return new Response('isSubscriber is required', { status: 422 })
        } catch (error) {
          return new Response('missing payload', { status: 400 })
        }
        // curl -X POST "https://edge-functions-backend.vercel.app/api/posts"  -H 'Authorization: Bearer 1btt566hxkovfzn4qwt2a6h8sdotnk' -H 'Client-Id: r2r4w2bedvlt0qmfexgpnzqvv1ymfq' -d '{"title":"title", "link":"link", "content":"content", "userId": "a32065f5-fc9e-4dfd-b292-4709d211a86c"}'

        const headerTwitchId = req.headers.get('X-twitch-id') as string
        if (!headerTwitchId) return new Response(JSON.stringify('no header twitch id'), { status: 401 })

        if (twitchId !== headerTwitchId) {
          return new Response(JSON.stringify('cannot create a different user'), { status: 403 })
        }

        const user = await prisma.user.upsert({
          where: { twitchId: twitchId },
          update: {
            displayName: payload.displayName,
            isSubscriber: payload.isSubscriber,
            isFollower: payload.isFollower,
          },
          create: {
            displayName: payload.displayName,
            isSubscriber: payload.isSubscriber,
            isFollower: payload.isFollower,
            twitchId: headerTwitchId,
          },
        })

        return new Response(JSON.stringify(user), { status: 201 })
      }
      case 'GET': {
        const user = await prisma.user.findFirst({ where: { twitchId: twitchId } })

        return new Response(JSON.stringify(user), { status: 201 })
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
