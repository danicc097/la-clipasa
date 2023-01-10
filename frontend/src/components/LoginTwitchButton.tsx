import React, { ReactNode } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitch } from '@fortawesome/free-brands-svg-icons'
import { Button } from '@mantine/core'

export default function LoginTwitchButton() {
  const redirectURI = encodeURIComponent(`${import.meta.env.VITE_URL}/api/auth/twitch/callback/`)

  return (
    <>
      <form
        action={`https://api.twitch.tv/kraken/oauth2/authorize?response_type=token&client_id=${
          import.meta.env.VITE_TWITCH_CLIENT_ID
        }&redirect_uri=${redirectURI}&scope=${encodeURI('user_read+user_subscriptions')}`}
        method="POST"
      >
        <Button
          type="submit"
          style={{
            backgroundColor: '#a970ff',
          }}
          leftIcon={<FontAwesomeIcon icon={faTwitch} size="xl" />}
        >
          Login
        </Button>
      </form>
    </>
  )
}
