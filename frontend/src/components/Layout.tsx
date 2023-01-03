import { useEffect, useState } from 'react'

import { Code } from '@mantine/core'
import { Prism } from '@mantine/prism'
import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Header from 'src/components/Header'
import { css } from '@emotion/react'
import { useQueryClient } from '@tanstack/react-query'
import { useUISlice } from 'src/slices/ui'

type LayoutProps = {
  children: React.ReactElement
}

export default function Layout({ children }: LayoutProps) {
  // doing query cache invalidation, etc. here since client is not yet initialized
  // in App and layout is used once. Maybe there's better options
  const queryClient = useQueryClient()

  useEffect(() => {
    // TODO if not user / not isAuthneticated -> fetch twitch user using ui slice twitchToken (only on startup)
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
      <main
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          min-height: 100vh;
        `}
      >
        {children}
      </main>
    </>
  )
}
