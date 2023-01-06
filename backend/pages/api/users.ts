import { NextRequest, NextResponse } from 'next/server'
import { useRouter } from 'next/router'
import { Prisma, PrismaClient } from 'database'
import { discordPostUpload } from '../../src/services/discord'
import prisma from '../../lib/prisma'

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
      case 'POST': {
        let payload
        try {
          payload = await req.json()
          console.log(payload)
          if (!payload.displayName) return new Response('displayName is required', { status: 422 })
        } catch (error) {
          return new Response('missing payload', { status: 400 })
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

        return new Response(JSON.stringify(user), { status: 201 })
      }
    }
  } catch (error) {
    if (!error) return new Response('internal server error', { status: 500 })

    if (error instanceof Prisma.PrismaClientValidationError) {
      console.log('error.message')
      console.log(error.message.match(/Argument .*/g))
    }
    // console.log(error)
    return new Response(JSON.stringify(error), { status: 500 })
  }
}
