import { NextRequest, NextResponse } from 'next/server'
import { globalEdgeConfig } from '../edgeConfig'

export const config = globalEdgeConfig

export default async (req: NextRequest, res: any) => {
  try {
    switch (req.method) {
      case 'GET':
        const res = await fetch(`https://discord.com/api/channels/${process.env.DISCORD_CHANNEL_ID}/messages`, {
          headers: { Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}` },
        })
        console.log(res.status)
        const messages = await res.json()

        return new Response(JSON.stringify({ messages }))
      case 'POST':
        try {
          const body = await req.json()

          console.log(body)
        } catch (error) {}
        break
    }
  } catch (error: any) {
    console.log(JSON.stringify(error))
    return new Response(JSON.stringify(error?.message))
  }
}
