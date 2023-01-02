import { NextRequest, NextResponse } from 'next/server'
import { useRouter } from 'next/router'

// can't use shared import
export const config = {
  runtime: 'experimental-edge',
  regions: ['cdg1', 'gru1', 'iad1'],
}

export default async (req: NextRequest) => {
  // calls to discord will be made from GET|POST /api/posts directly (which require authenticated user (MUST call twitch every hour or so
  // and especially before someone POST's /api/posts - see https://dev.twitch.tv/docs/authentication/validate-tokens)
  try {
    switch (req.method) {
      case 'GET': {
        break
      }
      case 'POST': {
        break
      }
    }
  } catch (error) {}
}
