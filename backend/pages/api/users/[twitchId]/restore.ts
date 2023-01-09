import { NextRequest, NextResponse } from 'next/server'
import { useRouter } from 'next/router'
import { Post, Prisma, PrismaClient } from 'database'
import prisma from 'lib/prisma'

// can't use shared import
export const config = {
  runtime: 'experimental-edge',
  regions: ['cdg1', 'gru1', 'iad1'],
}

export default async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const twitchId = searchParams.get('twitchId') ?? undefined

  try {
    switch (req.method) {
      case 'POST': {
        await prisma.user.update({ data: { deletedAt: null }, where: { id: twitchId }, select: null })

        return new Response(null, { status: 204 })
      }
    }
  } catch (error) {}
}
