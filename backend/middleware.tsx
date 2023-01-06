import { NextFetchEvent, NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { validateTwitchToken } from './src/services/authentication'
import cors from './lib/cors'

// Up to 1,000,000 middleware invocations
// https://vercel.com/docs/concepts/functions/edge-middleware
// exmaples: https://github.com/vercel/examples/tree/main/edge-functions

// cors: https://github.com/lfades/edge-cors if official stuff doesnt work

export default async function middleware(request: NextRequest) {
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

  // return cors(
  //   request,
  //   NextResponse.next({
  //     request: {
  //       // New request headers
  //       headers: requestHeaders,
  //     },
  //   }),
  // )

  return NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders,
    },
  })
}

// const allowCors = (fn: any) => async (req: any) => {
//   console.log(typeof req)
//   req.setHeader('Access-Control-Allow-Credentials', true)
//   req.setHeader('Access-Control-Allow-Origin', '*')
//   // another common pattern
//   // req.setHeader('Access-Control-Allow-Origin', req.headers.origin);
//   req.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
//   req.setHeader(
//     'Access-Control-Allow-Headers',
//     'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
//   )
//   if (req.method === 'OPTIONS') {
//     req.status(200).end()
//     return
//   }
//   return await fn(req, req)
// }

// export default allowCors(middleware)
