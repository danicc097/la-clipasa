import { useEffect, useState } from 'react'

import { Code, Image, ScrollArea } from '@mantine/core'
import { Prism } from '@mantine/prism'
import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Header from 'src/components/Header'
import { css } from '@emotion/react'
import { useQueryClient } from '@tanstack/react-query'
import { useUISlice } from 'src/slices/ui'
import Footer from 'src/components/Footer'
import {
  useTwitchBroadcasterLive,
  useTwitchUser,
  useTwitchUserFollower,
  useTwitchUserSubscriber,
} from 'src/queries/twitch'
import { useUserPostMutation } from 'src/queries/api'
import useAuthenticatedUser from 'src/hooks/auth/useAuthenticatedUser'

type LayoutProps = {
  children: React.ReactElement
}

export default function Layout({ children }: LayoutProps) {
  // doing query cache invalidation, etc. here since client is not yet initialized
  // in App and layout is used once. Maybe there's better options
  const queryClient = useQueryClient()
  const { isAuthenticated, isFollower, isSubscriber } = useAuthenticatedUser()
  const { hash } = useLocation()
  const { twitchToken, setTwitchToken } = useUISlice()
  const twitchUser = useTwitchUser()
  const twitchUserFollower = useTwitchUserFollower()
  const twitchUserSubscriber = useTwitchUserSubscriber()
  const twitchBroadcasterLive = useTwitchBroadcasterLive()
  const userPostMutation = useUserPostMutation()
  const [updateUserAfterLogin, setUpdateUserAfterLogin] = useState(false)

  useEffect(() => {
    // the URL hash is processed by the browser only. not available in edge function/backend
    // so must parse in useEffect
    const parsedHash = new URLSearchParams(hash.split('#')[1])
    const token = parsedHash.get('access_token')
    if (token !== '' && token) {
      setUpdateUserAfterLogin(true)
      setTwitchToken(token)
      // remove hash
      history.pushState('', document.title, window.location.pathname + window.location.search)
      // TODO call api POST /user and upsert (only will be done when login in, i.e. here)
    }
  }, [hash, setTwitchToken])

  useEffect(() => {
    if (twitchToken !== '') {
      twitchUser.refetch().then((res) => {
        twitchUserSubscriber.refetch()
        twitchUserFollower.refetch()
        twitchBroadcasterLive.refetch()
      })
    }
  }, [twitchToken, updateUserAfterLogin])

  useEffect(() => {
    if (updateUserAfterLogin && isAuthenticated && twitchUserFollower.isFetched && twitchUserSubscriber.isFetched) {
      userPostMutation.mutate({
        displayName: twitchUser?.data?.data?.[0]?.display_name,
        isFollower,
        isSubscriber,
      })
      setUpdateUserAfterLogin(false)
    }
  }, [
    updateUserAfterLogin,
    isAuthenticated,
    isFollower,
    isSubscriber,
    twitchUserFollower.isFetched,
    twitchUserSubscriber.isFetched,
    userPostMutation,
    twitchUser?.data?.data,
  ])

  useEffect(() => {
    queryClient.invalidateQueries({
      predicate: (query) => (query.queryKey[0] as string).startsWith('twitch'),
    })
  }, [])

  return (
    <>
      <Helmet>
        <title>La Clipasa</title>
        <meta name="description" content="La Clipasa" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
      <Header tabs={[]}></Header>
      {/* TODO when header becomes sticky, main should have a padding top of height=header height*/}
      <main
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          min-height: 100%;
        `}
      >
        {children}
      </main>
      <Footer></Footer>
    </>
  )
}
