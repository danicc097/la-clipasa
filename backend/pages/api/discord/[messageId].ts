import { NextRequest, NextResponse } from 'next/server'
import { useRouter } from 'next/router'
import { PrismaClient } from 'types'

// can't use shared import
export const config = {
  runtime: 'experimental-edge',
  regions: ['cdg1', 'gru1', 'iad1'],
}

export default async (request: NextRequest) => {
  // this route is not needed for either GET or POST.
  // calls to discord will be made from GET|POST /api/posts directly (which require authenticated user (MUST call twitch every hour or so
  // and especially before someone POST's /api/posts - see https://dev.twitch.tv/docs/authentication/validate-tokens)
  // Your app must validate the OAuth token when it starts and on an hourly basis thereafter.
}
