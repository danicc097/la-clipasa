import { useEffect, useState } from 'react'
import LoginTwitchButton from '../../components/LoginTwitchButton'
import Posts from '../../components/Posts'
import Post from '../../components/Post'
import Cookies from 'js-cookie'
import Header from '../../components/Header'
import { Code, Space, useMantineTheme } from '@mantine/core'
import { Prism } from '@mantine/prism'
import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { useUISlice } from 'src/slices/ui'
import { useTwitchUser, useTwitchUserFollower, useTwitchUserSubscriber } from 'src/queries/twitch'
import homeBackground from 'src/assets/background-la-clipassa.jpg'
import postDiamante from 'src/assets/post-diamante.png'
import useAuthenticatedUser from 'src/hooks/auth/useAuthenticatedUser'

export default function Home() {
  const { hash } = useLocation()
  const { twitchToken, setTwitchToken } = useUISlice()
  const { isFollower, isSubscriber } = useAuthenticatedUser()
  const { data: twitchUser, error: twitchUserError, refetch: twitchUserRefetch } = useTwitchUser()
  const {
    data: twitchUserSubscriber,
    error: twitchUserSubscriberError,
    refetch: twitchUserSubscriberRefetch,
  } = useTwitchUserSubscriber()
  const {
    data: twitchUserFollower,
    error: twitchUserFollowerError,
    refetch: twitchUserFollowerRefetch,
  } = useTwitchUserFollower()
  const { colorScheme, primaryColor } = useMantineTheme()

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
    if (twitchToken !== '') {
      twitchUserRefetch({ throwOnError: true }).then(() => {
        twitchUserSubscriberRefetch()
        twitchUserFollowerRefetch()
      })
    }
  }, [twitchUserRefetch, twitchToken, twitchUserSubscriberRefetch, twitchUserFollowerRefetch])

  useEffect(() => {
    if (twitchUserError?.response?.status === 401) {
      console.log('unauthenticated: ', twitchUserError.response.data)
    }
  }, [twitchUserError])

  useEffect(() => {
    document.body.style.background = `url(${homeBackground}) no-repeat center/cover`

    return () => {
      document.body.style.background = ''
    }
  }, [])

  return (
    <>
      {/* <div
        style={{
          position: 'absolute',
          top: 0,
          width: '60vw',
          minHeight: '100%',
          height: '100%',
          backgroundColor: colorScheme === 'dark' ? '#212327a4' : '#f7f3f35d',
          // boxShadow: '2px 2px 5px 0px rgba(0, 0, 0, 0.3), -2px -2px 5px 0px rgba(0, 0, 0, 0.3)',
          zIndex: -1,
        }}
      /> */}
      <p>Is subscriber: {JSON.stringify(isSubscriber)}</p>
      <p>Is follower: {JSON.stringify(isFollower)}</p>
      <p>Twitch user token: {twitchToken}</p>
      <Prism language="json" scrollAreaComponent="div" styles={{ root: { width: '50vw' } }}>
        {JSON.stringify(twitchUser?.['data']?.[0] ?? '', undefined, 2)}
      </Prism>
      {/* <Posts /> */}
      <Space />
      <Post
        author={{ name: 'some_user', description: 'posted X minutes ago', image: '' }}
        categories={['SIN_SONIDO', 'DIAMANTE', 'NO_SE_YO']}
        title={'Some title for this'}
        footer={<div>footer div</div>}
        image={postDiamante}
      />
    </>
  )
}
