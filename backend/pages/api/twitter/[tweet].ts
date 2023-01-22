import { NextRequest } from 'next/server'

// can't use shared import
export const config = {
  runtime: 'experimental-edge',
  regions: ['cdg1', 'gru1', 'iad1'],
}

export default async (request: NextRequest) => {
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
