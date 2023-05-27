import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitch } from '@fortawesome/free-brands-svg-icons'
import { Button } from '@mantine/core'

export default function LoginTwitchButton() {
  const redirectURI = encodeURIComponent(`${import.meta.env.VITE_URL}/api/auth/twitch/callback/`)

  return (
    <>
      <form>
        <Button
          type="submit"
          style={{
            backgroundColor: '#a970ff',
          }}
          onClick={(e) => {
            e.preventDefault()
            location.href = `https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=${
              import.meta.env.VITE_TWITCH_CLIENT_ID
            }&redirect_uri=${redirectURI}&scope=${encodeURI(
              'user:read:subscriptions+user:read:follows+user:read:email',
            )}`
          }}
          leftIcon={<FontAwesomeIcon icon={faTwitch} size="xl" />}
        >
          Login
        </Button>
      </form>
    </>
  )
}
