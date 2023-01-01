import { useEffect, useState } from 'react'

import { Code } from '@mantine/core'
import { Prism } from '@mantine/prism'
import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import NavBar from 'src/components/NavBar'
import { css } from '@emotion/react'

type LayoutProps = {
  children: React.ReactElement
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Helmet>
        <title>Edge functions test</title>
        <meta name="description" content="Edge functions test" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
      {/*
        TODO from react-query
      <NavBar avatarUrl={twitchUser?.['data']?.[0]?.['profile_image_url'] ?? ''} tabs={[]}></NavBar> */}
      <NavBar avatarUrl={''} tabs={[]}></NavBar>
      <main
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          padding: 6rem;
          min-height: 100vh;
        `}
      >
        {children}
      </main>
    </>
  )
}
