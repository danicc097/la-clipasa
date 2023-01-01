import { useEffect, useState } from 'react'

import { Code } from '@mantine/core'
import { Prism } from '@mantine/prism'
import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Header from 'src/components/Header'
import { css } from '@emotion/react'
import { useTwitchUser } from 'src/queries/twitch'

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
      <Header tabs={[]}></Header>
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
