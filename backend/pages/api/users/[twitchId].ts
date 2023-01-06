import { NextRequest, NextResponse } from 'next/server'
import { useRouter } from 'next/router'
import { Post, Prisma, PrismaClient } from 'database'
import prisma from '../../../lib/prisma'

// can't use shared import
export const config = {
  runtime: 'experimental-edge',
  regions: ['cdg1', 'gru1', 'iad1'],
}

export default async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const twitchId = searchParams.get('twitchId') ?? undefined

  // individual post visualization when clicking on post or visiting it
  // (visit renders same thing as modal, which should include moderation actions, etc. already)
  // This is the only route that will GET discord embed by message id to save
  //  some space and avoid waiting for embed generation upon post creation
  try {
    switch (req.method) {
      case 'GET': {
        const user = await prisma.user.findFirst({ where: { twitchId: twitchId } })

        return new Response(JSON.stringify(user), { status: 201 })
      }
    }
  } catch (error) {}
}
