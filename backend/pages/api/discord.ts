import { Prisma } from 'database'
import { NextRequest, NextResponse } from 'next/server'
import { TwitchUser } from 'types'

// can't use shared import
export const config = {
  runtime: 'experimental-edge',
  regions: ['cdg1', 'gru1', 'iad1'],
}

/**

IMPORTANT:
- Discord serves just as an embed generator.
  Everything works even if discord is down. We will only use discord
  to fetch the embeds it generates for twitter, etc. for every message.

*/
export default async (req: NextRequest) => {
  try {
    switch (req.method) {
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
        // IMPORTANT: we will not use discord for post fetching, will use db posts. Leaving this for convenience to check
        // created messages
        const res = await fetch(`https://discord.com/api/channels/${process.env.DISCORD_CHANNEL_ID}/messages`, {
          headers: { Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}` },
        })

        const rateLimitHeaders: any = {}
        for (const [key, value] of res.headers.entries()) {
          if (key.startsWith('x-ratelimit')) {
            rateLimitHeaders[key] = value
          }
        }
        console.log(rateLimitHeaders)
        const messages = await res.json()

        return new Response(JSON.stringify({ messages }))
      }
      case 'POST': {
        // move to api/posts and POST to discord after successful db create
        // need twitch current "display_name", title, twitch id and a single url or nothing if its a file upload
        let payload: Prisma.PostUncheckedCreateInput
        try {
          payload = await req.json()
          console.log(payload)
        } catch (error) {
          return new Response('missing payload', { status: 400 })
        }
        /*
          NOTE: Bot needs embed permission on channel.
                Embeds are always generated a few seconds after it is posted as long as no other embed is sent.

          curl -X POST http://localhost:3000/api/discord -H 'Content-Type: application/json' -d '{
            "content": "https://twitter.com/caliebre/status/1608936054819782660?cxt=HHwWiIDQ3ae0i9QsAAAA\n",
            "tts": false,
            "type": "rich"
          }'
          */

        /**
        UPDATE: not worth it, will call discord only when showing directly in modal
        To save up edge function calls:
        wait a few seconds and fetch discord message, which will contain a generated embed
        (we have 30s worth of edge function).
        Retry discord call until GET /messages/{id} returns a non-empty embed field
        */

        return new Response(JSON.stringify('body'))
      }
      default:
        break
    }
  } catch (error: any) {
    console.log(JSON.stringify(error))
    return new Response(JSON.stringify(error?.message))
  }
}
