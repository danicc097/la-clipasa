import { NextFetchEvent, NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { validateTwitchToken } from './src/services/authentication'
import cors from './lib/cors'

// Up to 1,000,000 middleware invocations

export default async function middleware(request: NextRequest, event: NextFetchEvent) {
  const requestHeaders = new Headers(request.headers)

  const discord = request.nextUrl.pathname.match(/\/api\/discord*/)
  const getPost = request.nextUrl.pathname.match(/\/api\/posts*/) && request.method === 'GET'
  const twitchAuth = request.nextUrl.pathname.match(/\/api\/auth*/)

  const publicRoute = getPost || twitchAuth || discord

  if (!publicRoute) {
    const token = request.headers.get('Authorization')?.split('Bearer ')[1]
    // TODO validateTwitchToken -> twitch id -> db user by twitch id -> set x-twitch-id header for next()
    const twitchId = await validateTwitchToken(token)
    if (!token || !twitchId) {
      return new Response('unauthenticated', { status: 401 })
    }

    requestHeaders.set('x-twitch-id', twitchId)
  }

  return cors(
    request,
    NextResponse.next({
      request: {
        // New request headers
        headers: requestHeaders,
      },
    }),
  )
}
