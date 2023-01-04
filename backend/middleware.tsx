import { NextFetchEvent, NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { validateTwitchToken } from './src/services/authentication'

// Up to 1,000,000 middleware invocations

export default async function middleware(request: NextRequest, event: NextFetchEvent) {
  const getPost = request.nextUrl.pathname.match(/\/api\/posts*/) && request.method === 'GET'

  if (!getPost) {
    if (!(await validateTwitchToken(request.headers.get('Authorization')))) {
      return new Response('unauthenticated', { status: 401 })
    }
  }

  return NextResponse.next()
}
