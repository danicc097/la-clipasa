import { useEffect, useState } from 'react'
import LoginTwitchButton from '../../components/LoginTwitchButton'
import Posts from '../../components/Posts'
import Post from '../../components/Post'
import Cookies from 'js-cookie'
import Header from '../../components/Header'
import { Code, Container, Group, Space, useMantineTheme } from '@mantine/core'
import { Prism } from '@mantine/prism'
import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { useUISlice } from 'src/slices/ui'
import {
  useTwitchBroadcasterLive,
  useTwitchUser,
  useTwitchUserFollower,
  useTwitchUserSubscriber,
  useTwitchValidateToken,
} from 'src/queries/twitch'
import homeBackground from 'src/assets/background-la-clipassa.jpg'
import useAuthenticatedUser from 'src/hooks/auth/useAuthenticatedUser'
import { css } from '@emotion/react'

export default function Home() {
  const { hash } = useLocation()
  const { twitchToken, setTwitchToken } = useUISlice()
  const twitchUser = useTwitchUser()
  const twitchUserFollower = useTwitchUserFollower()
  const twitchUserSubscriber = useTwitchUserSubscriber()
  const twitchBroadcasterLive = useTwitchBroadcasterLive()

  useEffect(() => {
    // the URL hash is processed by the browser only. not available in edge function/backend
    // so must parse in useEffect
    const parsedHash = new URLSearchParams(hash.split('#')[1])
    const token = parsedHash.get('access_token')
    if (token !== '' && token) {
      setTwitchToken(token)
      // remove hash
      history.pushState('', document.title, window.location.pathname + window.location.search)
    }
  }, [hash, setTwitchToken])

  useEffect(() => {
    if (twitchToken !== '') {
      twitchUser.refetch({ throwOnError: true }).then(() => {
        twitchUserSubscriber.refetch()
        twitchUserFollower.refetch()
        twitchBroadcasterLive.refetch()
      })
    }
  }, [twitchToken])

  useEffect(() => {
    if (twitchUser.error?.response?.status === 401) {
      console.log('unauthenticated: ', twitchUser.error.response.data)
    }
  }, [twitchUser.error])

  useEffect(() => {
    document.body.style.background = `url(${homeBackground}) no-repeat center/cover`

    return () => {
      document.body.style.background = ''
    }
  }, [])

  return (
    <Container style={{ padding: 0, margin: '2rem' }}>
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
      {/* <Posts /> */}

      <Container
        css={css`
          .post:not(:first-child) {
            margin-top: 1rem;
          }

          min-width: 100%;
        `}
      >
        <Space />
        <Post
          author={{ name: 'some_user', description: 'posted X minutes ago', image: '' }}
          categories={['SIN_SONIDO', 'DIAMANTE', 'NO_SE_YO']}
          title={'A very very  very very very very very very very very very very very very very very long post'}
          className="post"
          footer={<div>footer div</div>}
          likes={100}
        />
        <Post
          author={{ name: 'some_user', description: 'posted X minutes ago', image: '' }}
          categories={['SIN_SONIDO', 'RANA']}
          title={'Some title for this'}
          className="post"
          footer={<div>footer div</div>}
          likes={4324}
        />
        <Post
          author={{ name: 'some_user', description: 'posted X minutes ago', image: '' }}
          categories={['ORO']}
          title={'Some title for this'}
          className="post"
          footer={<div>footer div</div>}
          likes={14324}
        />
        <Post
          author={{ name: 'some_user', description: 'posted X minutes ago', image: '' }}
          categories={[]}
          title={'Some title for this'}
          className="post"
          footer={<div>footer div</div>}
          likes={2}
        />
      </Container>
    </Container>
  )
}
