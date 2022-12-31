import { NextRequest, NextResponse } from 'next/server'
import { useRouter } from 'next/router'

export const config = {
  runtime: 'edge',
}

export default async (request: NextRequest, response: any) => {
  try {
    const tweet = request.url // TODO accept url via query/url param
    const res = await fetch(
      `https://publish.twitter.com/oembed?url=https://twitter.com/StrangestMedia/status/1608633970702389251`,
    )

    const body = await res.json()

    return new Response(body.html) // requires twitter widgets
  } catch (error: any) {
    console.log(JSON.stringify(error))
    return new Response(JSON.stringify(error?.message))
  }
}
