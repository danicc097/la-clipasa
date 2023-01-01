import { useEffect, useState } from 'react'
import LoginTwitchButton from '../../components/LoginTwitchButton'
import Post from '../../components/Posts'
import Cookies from 'js-cookie'
import NavBar from '../../components/NavBar'
import { Code } from '@mantine/core'
import { Prism } from '@mantine/prism'
import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default function Home() {
  const { hash } = useLocation()
  const [twitchToken, setTwitchToken] = useState('')
  const [twitchUser, setTwitchUser] = useState(null)

  useEffect(() => {
    // the URL hash is processed by the browser only. not available in edge function/backend
    // so must parse in useEffect
    const parsedHash = new URLSearchParams(hash.split('#')[1])
    const token = parsedHash.get('access_token')
    if (token !== '' && token) {
      setTwitchToken(token)
      Cookies.set('twitchAccessToken', token, {
        expires: 365,
        sameSite: 'none',
        secure: true,
      })
      fetchTwitchUser(token).catch(console.error)
      // remove hash
      history.pushState('', document.title, window.location.pathname + window.location.search)
    }
  }, [hash, setTwitchToken])

  async function fetchTwitchUser(token: string) {
    const user = await (
      await fetch('https://api.twitch.tv/helix/users', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Client-Id': import.meta.env.VITE_TWITCH_CLIENT_ID ?? '',
        },
      })
    ).json()
    setTwitchUser(user)
  }

  return (
    <>
      <NavBar avatarUrl={twitchUser?.['data']?.[0]?.['profile_image_url'] ?? ''} tabs={[]}></NavBar>
      <p>Twitch user token: {twitchToken}</p>
      <Prism language="json" scrollAreaComponent="div">
        {JSON.stringify(twitchUser?.['data']?.[0] ?? '', undefined, 2)}
      </Prism>
      <Post />
    </>
  )
}
