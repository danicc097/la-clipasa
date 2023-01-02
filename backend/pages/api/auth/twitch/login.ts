import { NextRequest, NextResponse } from 'next/server'
import { formatURLWithQueryParams } from '../../../../src/utils/url'
// import { cookies } from 'next/headers'

// can't use shared import
export const config = {
  runtime: 'experimental-edge',
  regions: ['cdg1', 'gru1', 'iad1'],
}

// login as twitch app client. In case we need to retrieve some twitch info without the need of an authenticated user.
;async (request: NextRequest) => {
  try {
    const res = await (
      await fetch(
        formatURLWithQueryParams('https://id.twitch.tv/oauth2/token', {
          client_id: process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID ?? '',
          client_secret: process.env.TWITCH_CLIENT_SECRET ?? '',
          grant_type: 'client_credentials',
        }),
        {
          method: 'POST',
        },
      )
    ).json()

    // TODO save res.access_token somewhere
  } catch (error: any) {
    console.log(JSON.stringify(error))
    return new Response(JSON.stringify(error?.message))
  }
}
