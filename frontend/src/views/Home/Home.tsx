import { useEffect, useState } from 'react'
import LoginTwitchButton from '../../components/LoginTwitchButton'
import Post from '../../components/Posts'
import Cookies from 'js-cookie'
import NavBar from '../../components/NavBar'
import { Code } from '@mantine/core'
import { Prism } from '@mantine/prism'
import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { useUISlice } from 'src/slices/ui'
import { useTwitchUser } from 'src/slices/react-query/twitch'

export default function Home() {
  const { hash } = useLocation()
  const { twitchToken, setTwitchToken } = useUISlice()
  const { data: twitchUser, isLoading, error } = useTwitchUser()

  useEffect(() => {
    // the URL hash is processed by the browser only. not available in edge function/backend
    // so must parse in useEffect
    const parsedHash = new URLSearchParams(hash.split('#')[1])
    const token = parsedHash.get('access_token')
    if (token !== '' && token) {
      setTwitchToken(token)
      // fetchTwitchUser(token).catch(console.error)
      // remove hash
      history.pushState('', document.title, window.location.pathname + window.location.search)
    }
  }, [hash, setTwitchToken])

  useEffect(() => {
    if (error) {
      console.log(error.response.data)
      if (error.status === 401) {
      }
    }
  }, [error])

  return (
    <>
      <NavBar tabs={[]}></NavBar>
      <p>Twitch user token: {twitchToken}</p>
      <Prism language="json" scrollAreaComponent="div">
        {JSON.stringify(twitchUser?.['data']?.[0] ?? '', undefined, 2)}
      </Prism>
      <Post />
    </>
  )
}
