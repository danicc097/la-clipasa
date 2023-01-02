import { NextFetchEvent, NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Up to 1,000,000 middleware invocations
export const config = {
  // matcher: '/api/:path*',
  matcher: '/-------',
}

export default function middleware(request: NextRequest, event: NextFetchEvent) {
  console.log('executing middleware')

  return NextResponse.next()
}
