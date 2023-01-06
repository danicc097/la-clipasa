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
      // only get, no batch update/post
      case 'GET': {
        // all posts with infinite scroll (https://react-query-v3.tanstack.com/guides/infinite-queries)
        break
      }
      case 'POST': {
        let payload: Prisma.PostUncheckedCreateInput
        try {
          payload = await req.json()
          console.log(payload)
        } catch (error) {
          return new Response('missing payload', { status: 400 })
        }
        const post = await prisma.post.create({ data: payload })

        await discordPostUpload(post)

        return new Response(JSON.stringify(post), { status: 201 })
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
