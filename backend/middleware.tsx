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
  if (request.method === 'OPTIONS') {
    return new Response('OK', { status: 200 })
  }

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
