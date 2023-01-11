import { useEffect, useState } from 'react'

import { Code, Drawer, Flex, Group, Image, ScrollArea, Space, createStyles } from '@mantine/core'
import { Prism } from '@mantine/prism'
import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Header, { HEADER_HEIGHT } from 'src/components/Header'
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
import { useUserUpdateOrCreate } from 'src/queries/api/users'
import useAuthenticatedUser from 'src/hooks/auth/useAuthenticatedUser'
import HomeSideActions from 'src/views/Home/HomeSideActions'
import banner from 'src/assets/banner-la-clipassa.png'

const useStyles = createStyles((theme) => ({
  sidebar: {
    [theme.fn.smallerThan('xs')]: {},
  },

  drawer: {
    /* margin-top: ${HEADER_HEIGHT}px; */
    height: ' 100%',
    minWidth: '100%',
    zIndex: 10000,

    [theme.fn.largerThan('md')]: {
      minWidth: '40%',
    },
  },
}))

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
  const userUpdateOrCreateMutation = useUserUpdateOrCreate()
  const { classes } = useStyles()
  const { burgerOpened, setBurgerOpened } = useUISlice()
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
      userUpdateOrCreateMutation.mutate({
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
    userUpdateOrCreateMutation,
    twitchUser?.data?.data,
  ])

  useEffect(() => {
    queryClient.invalidateQueries({
      predicate: (query) => (query.queryKey[0] as string).startsWith('twitch'),
    })
  }, [])

  useEffect(() => {
    const s = document.createElement('script')
    s.setAttribute('src', 'https://platform.twitter.com/widgets.js') // also see  "react-twitter-embed"
    s.setAttribute('async', 'true')
    document.head.appendChild(s)
  })

  return (
    <>
      <Helmet>
        <title>La Clipasa</title>
        <meta name="description" content="El mejor evento de todo Twitch International" title="La Clipasa - Caliebre" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
      <Image alt="la clipasa" src={banner} />
      <Header tabs={[]}></Header>

      {/* TODO when header becomes sticky, main should have a padding top of height=header height*/}
      <main
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          min-height: calc(100vh - ${HEADER_HEIGHT}px);
        `}
      >
        {children}
      </main>
      <Drawer
        className={classes.drawer}
        transitionDuration={250}
        transitionTimingFunction="ease"
        opened={burgerOpened}
        onClose={() => {
          setBurgerOpened(false)
        }}
      >
        <Flex align={'center'} direction="column">
          <HomeSideActions
            css={css`
              @media only screen and (min-width: 1200px) {
                display: none;
              }
            `}
          />
        </Flex>
      </Drawer>
      <Footer></Footer>
    </>
  )
}
