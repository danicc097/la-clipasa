import { Post } from 'database'

/**
 * Actually not that useful since we can already use twitter widgets, youtube
 * and instagram embed cannot be used in browser
 * @param post
 * @returns
 * @deprecated
 */
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

  // returns a https://discord.com/developers/docs/resources/channel#message-object
  const body = await res.json()
  console.log(body)

  return body.id
}

export async function getDiscordPostEmbed(post: Post) {
  const res = await fetch(`https://discord.com/api/channels/${process.env.DISCORD_CHANNEL_ID}/messages/<messageid>`, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
      'Content-Type': 'application/json',
    },
  })

  // returns a https://discord.com/developers/docs/resources/channel#message-object
  const body = await res.json()
  console.log(body)

  return body.content
}
