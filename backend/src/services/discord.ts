import { Post } from 'database'

export async function discordPostUpload(post: Post) {
  const res = await fetch(`https://discord.com/api/channels/${process.env.DISCORD_CHANNEL_ID}/messages`, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content: post.content,
      tts: false,
      type: 'rich',
    }),
    method: 'POST',
  })
  const body = await res.json()
  console.log(res.status)
  console.log(body)
}
