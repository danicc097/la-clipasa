import { NextRequest, NextResponse } from 'next/server'

// can't use shared import
export const config = {
  runtime: 'edge',
  regions: ['cdg1', 'gru1', 'iad1'],
}

export default async (req: NextRequest, response: any) => {
  try {
    switch (req.method) {
      // TODO setup cache for this edge function and retry with backoff on 429. This has x-ratelimit-limit of 5
      // maybe will need to move POST elsewhere
      // see:
      // https://vercel.com/docs/concepts/edge-network/caching
      // https://vercel.com/docs/concepts/functions/edge-functions/edge-caching
      //
      // https://discord.com/developers/docs/topics/rate-limits
      // should log and avoid 401, 403, or 429.
      case 'GET':
        const res = await fetch(`https://discord.com/api/channels/${process.env.DISCORD_CHANNEL_ID}/messages`, {
          headers: { Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}` },
        })
        console.log(res.status)
        console.log(res.headers)
        const messages = await res.json()

        return new Response(JSON.stringify({ messages }))
      case 'POST':
        // need twitch "display_name" and a single url or nothing if its a file upload
        try {
          const body = await req.json()

          console.log(body)
        } catch (error) {}
        break
      default:
        break
    }
  } catch (error: any) {
    console.log(JSON.stringify(error))
    return new Response(JSON.stringify(error?.message))
  }
}
