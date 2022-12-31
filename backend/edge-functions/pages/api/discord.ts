import { NextRequest, NextResponse } from 'next/server'

// can't use shared import
export const config = {
  runtime: 'edge',
  regions: ['cdg1', 'gru1', 'iad1'],
}

export default async (req: NextRequest) => {
  try {
    switch (req.method) {
      // TODO setup cache for this edge function and retry with backoff on 429. This has x-ratelimit-limit of 5
      // maybe will need to move POST elsewhere
      // see:
      // https://vercel.com/guides/using-databases-with-vercel#optimize-for-high-cache-hit-rates
      // https://vercel.com/docs/concepts/edge-network/caching
      // https://vercel.com/docs/concepts/functions/edge-functions/edge-caching
      // also see if supabase is worth it for something:
      // https://vercel.com/templates?database=supabase
      //
      // https://discord.com/developers/docs/topics/rate-limits
      // should log and avoid 401, 403, or 429.
      case 'GET': {
        const res = await fetch(`https://discord.com/api/channels/${process.env.DISCORD_CHANNEL_ID}/messages`, {
          headers: { Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}` },
        })
        console.log(res.status)
        console.log(res.headers)
        const messages = await res.json()

        return new Response(JSON.stringify({ messages }))
      }
      case 'POST': {
        // need twitch "display_name" and a single url or nothing if its a file upload
        let payload
        try {
          payload = await req.json()
          console.log(payload)
        } catch (error) {}
        /*

          NOTE: Bot needs embed permission on channel.
          curl -X POST http://localhost:3000/api/discord -H 'Content-Type: application/json' -d '{
            "content": "https://twitter.com/caliebre/status/1608936054819782660?cxt=HHwWiIDQ3ae0i9QsAAAA\n",
            "tts": false,
            "type": "rich",
            "embeds": [{
            "description": "<username>, etc."
          }]
          }'
,
            "embeds": [{
            "description": "<username>, etc."
          }]

          NOTE: not needed. bot message will also generate embed and let us use discord cdn.
            "embeds": [{
            "description": "[link](link)",
            "url": "link"
          }]

          */
        const res = await fetch(`https://discord.com/api/channels/${process.env.DISCORD_CHANNEL_ID}/messages`, {
          headers: {
            Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
          method: 'POST',
        })
        const body = await res.json()
        console.log(res.status)
        console.log(body)
        return new Response(JSON.stringify(body))
      }
      default:
        break
    }
  } catch (error: any) {
    console.log(JSON.stringify(error))
    return new Response(JSON.stringify(error?.message))
  }
}
