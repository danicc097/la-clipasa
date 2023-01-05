import { NextRequest, NextResponse } from 'next/server'
import { useRouter } from 'next/router'
import { Prisma, PrismaClient, PrismaEdge } from 'database'
import { discordPostUpload } from '../../src/services/discord'

// TODO https://github.com/prisma/prisma/issues/6219#issuecomment-1264724714
// https://github.com/prisma/prisma/issues/10305#issuecomment-1148988650
// https://www.prisma.io/blog/database-access-on-the-edge-8F0t1s1BqOJE?utm_source=summari
// possibly need data proxy after all
// if not working go for raw sql which should have been the first option anyway
const prisma = new PrismaEdge.PrismaClient()

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
  } catch (error) {}
}
