export async function validateToken(token: string | null): Promise<boolean> {
  if (!token) return false

  const res = await fetch('https://id.twitch.tv/oauth2/validate', {
    headers: {
      Authorization: `OAuth ${token}`,
    },
  })

  if (res.status !== 200) {
    return false
  }

  return true
}
