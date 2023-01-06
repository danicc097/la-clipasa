import { useEffect, useState } from 'react'
import Posts from '../../components/Posts'
import Post from '../../components/Post'
import Cookies from 'js-cookie'
import Header from '../../components/Header'
import { Code, Container, Group, ScrollArea, Space, useMantineTheme } from '@mantine/core'
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
  // TODO padding before footer including image (right now empty background)

  return (
    <>
      <div
        style={{
          background: `url(${homeBackground}) no-repeat center/cover`,
          minHeight: '100%',
          overflow: 'hidden',
          position: 'absolute',
          msFlex: 'none',
          flex: 'none',
          width: '100vw',
          backgroundPosition: '50% 50%',
        }}
      />
      <Container style={{ padding: 0 }}>
        {/* <Posts /> */}

        <ScrollArea style={{ height: '100vh' }} type="never">
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
              title={
                'A very very  very very very very very very very very very very very very very very very very very very very very long post'
              }
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
            {Array(7)
              .fill(null)
              .map((e, idx) => (
                <Post
                  key={idx}
                  author={{ name: 'some_user', description: 'posted X minutes ago', image: '' }}
                  categories={[]}
                  title={'Some title for this'}
                  className="post"
                  footer={<div>footer div</div>}
                  likes={2}
                />
              ))}
          </Container>
        </ScrollArea>
      </Container>
    </>
  )
}
