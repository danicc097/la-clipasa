import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import LoginTwitchButton from '../src/components/LoginTwitchButton'
import Post from '../src/components/Posts'
import Cookies from 'js-cookie'
import NavBar from '../src/components/NavBar'

export default function Home() {
  const { asPath } = useRouter()
  const [twitchToken, setTwitchToken] = useState('')
  const [twitchUser, setTwitchUser] = useState(null)

  useEffect(() => {
    // the  URL hash is processed by the browser only. not available in edge function
    const hash = asPath.split('#')[1]
    console.log(hash)
    const parsedHash = new URLSearchParams(hash)
    const token = parsedHash.get('access_token')
    if (token !== '' && token) {
      setTwitchToken(token)
      Cookies.set('twitchAccessToken', token, {
        expires: 365,
        sameSite: 'none',
        secure: true,
      })
      fetchTwitchUser(token).catch(console.error)
    }
  }, [asPath, setTwitchToken])

  async function fetchTwitchUser(token: string) {
    const user = await (
      await fetch('https://api.twitch.tv/helix/users', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Client-Id': process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID ?? '',
        },
      })
    ).json()
    setTwitchUser(user)
  }

  return (
    <>
      <Head>
        <title>Edge functions test</title>
        <meta name="description" content="Edge functions test" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <NavBar avatarUrl={twitchUser?.['data']?.[0]?.['profile_image_url'] ?? ''}></NavBar>
        <LoginTwitchButton></LoginTwitchButton>
        <p>Twitch token: {twitchToken}</p>
        <p>Twitch client: {process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID}</p>
        <p>Twitch user: {JSON.stringify(twitchUser?.['data']?.[0]?.['display_name'])}</p>
        {JSON.stringify(twitchUser?.['data']?.[0], undefined, 2)}
        <Post />
      </main>
    </>
  )
}
