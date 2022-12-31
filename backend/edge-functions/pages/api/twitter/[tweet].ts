import { NextRequest, NextResponse } from 'next/server'
import { useRouter } from 'next/router'
import { globalEdgeConfig } from '../../edgeConfig'

export const config = globalEdgeConfig

export default async (request: NextRequest, response: any) => {
  try {
    const { searchParams } = new URL(request.url)
    const tweet = searchParams.get('tweet')
    console.log(tweet)
    const twitterEmbedURL = `https://publish.twitter.com/oembed?url=${encodeURIComponent(tweet ?? '')}`
    console.log(twitterEmbedURL)
    const res = await fetch(twitterEmbedURL)

    const body = await res.json()

    console.log(JSON.stringify(body))

    return new Response(JSON.stringify(body.html)) // requires twitter widgets
  } catch (error: any) {
    console.log(JSON.stringify(error))
    return new Response(JSON.stringify(error?.message))
  }
}
