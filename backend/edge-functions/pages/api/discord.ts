import { NextRequest, NextResponse } from "next/server";

export const config = {
  runtime: "edge",
};

export default async (request: NextRequest, response: any) => {
  try {
    try {
      const body = await request.json();

      console.log(body);
    } catch (error) {}

    const res = await fetch(
      `https://discord.com/api/channels/${process.env.DISCORD_CHANNEL_ID}/messages`,
      {
        headers: { Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}` },
      }
    );
    console.log(res.status);
    const messages = await res.json();

    return new Response(JSON.stringify({ messages }));
  } catch (error: any) {
    console.log(JSON.stringify(error));
    return new Response(JSON.stringify(error?.message));
  }
};
