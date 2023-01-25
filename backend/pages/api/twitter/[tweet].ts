import { NextRequest } from 'next/server'
import { formatURLWithQueryParams } from 'src/utils/url'

// can't use shared import
export const config = {
  runtime: 'experimental-edge',
  regions: ['cdg1', 'gru1', 'iad1'],
}

export default async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url)
    const tweet = searchParams.get('tweet')

    const theme = searchParams.get('theme')
    const twitterEmbedURL = formatURLWithQueryParams('https://publish.twitter.com/oembed', {
      url: tweet ?? '',
      theme: theme ?? 'light',
      chrome: 'transparent nofooter noborders noheader noscrollbar',
    })

    const res = await fetch(twitterEmbedURL)

    const body = await res.json()

    console.log(JSON.stringify(body))

    return new Response(JSON.stringify(body.html), {
      headers: {
        'Cache-Control': `public, max-age=${3600 * 24 * 10}, stale-while-revalidate=${3600 * 24 * 30}`,
      },
    }) // requires twitter widgets client-side
  } catch (error: any) {
    console.log(JSON.stringify(error))
    return new Response(JSON.stringify(error?.message))
  }
}
