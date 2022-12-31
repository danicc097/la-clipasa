import { NextFetchEvent, NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const config = {
  matcher: '/api/:path*',
}

export default function middleware(request: NextRequest, event: NextFetchEvent) {
  console.log('executing middleware')
  return NextResponse.next()
}
