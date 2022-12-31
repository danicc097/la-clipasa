import React, { ReactNode } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitch } from '@fortawesome/free-brands-svg-icons'

const LoginTwitchButton = () => {
  const redirectURI = encodeURIComponent(`${process.env.NEXT_PUBLIC_URL}/api/auth/twitch/callback/`)
  return (
    <>
      <form
        action={`https://api.twitch.tv/kraken/oauth2/authorize?response_type=token&client_id=${process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID}&redirect_uri=${redirectURI}&scope=user_read`}
        method="POST"
      >
        <button
          className="button ui positive"
          style={{
            backgroundColor: '#a970ff',
            display: 'flex',
            minWidth: '190px',
            alignItems: 'center',
            gap: '10px',
            whiteSpace: 'nowrap',
          }}
        >
          <FontAwesomeIcon icon={faTwitch} size="xs" />
          Login with Twitch
        </button>
      </form>
    </>
  )
}

export default LoginTwitchButton
