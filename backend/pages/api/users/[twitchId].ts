import { NextRequest, NextResponse } from 'next/server'
import { useRouter } from 'next/router'
import { Post, Prisma, PrismaClient } from 'database'
import prisma from '../../../lib/prisma'
import { UserUpdateOrCreate } from 'types'
import cors from '../../../lib/cors'

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
      case 'POST': {
        let payload: UserUpdateOrCreate
        try {
          payload = await req.json()
          console.log(payload)
          if (!payload.displayName) return cors(req, new Response('displayName is required', { status: 422 }))
        } catch (error) {
          return cors(req, new Response('missing payload', { status: 400 }))
        }
        // curl -X POST "https://edge-functions-backend.vercel.app/api/posts"  -H 'Authorization: Bearer 1btt566hxkovfzn4qwt2a6h8sdotnk' -H 'Client-Id: r2r4w2bedvlt0qmfexgpnzqvv1ymfq' -d '{"title":"title", "link":"link", "content":"content", "userId": "a32065f5-fc9e-4dfd-b292-4709d211a86c"}'

        const headerTwitchId = req.headers.get('x-twitch-id') as string

        const user = await prisma.user.upsert({
          where: { twitchId: headerTwitchId },
          update: {
            displayName: payload.displayName,
          },
          create: {
            displayName: payload.displayName,
            twitchId: headerTwitchId,
          },
        })

        return cors(req, new Response(JSON.stringify(user), { status: 201 }))
      }
      case 'GET': {
        const user = await prisma.user.findFirst({ where: { twitchId: twitchId } })

        return cors(req, new Response(JSON.stringify(user), { status: 201 }))
      }
    }
  } catch (error) {
    if (!error) return cors(req, new Response('internal server error', { status: 500 }))

    if (error instanceof Prisma.PrismaClientValidationError) {
      console.log('error.message')
      console.log(error.message.match(/Argument .*/g))
    }
    // console.log(error)
    return cors(req, new Response(JSON.stringify(error), { status: 500 }))
  }
}
