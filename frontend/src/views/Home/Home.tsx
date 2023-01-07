import { useEffect, useState } from 'react'
import Posts from '../../components/Post.old'
import Post from '../../components/Post'
import Cookies from 'js-cookie'
import Header from '../../components/Header'
import {
  Checkbox,
  Code,
  Container,
  Group,
  ScrollArea,
  Space,
  Text,
  TextInput,
  createStyles,
  useMantineTheme,
} from '@mantine/core'
import { Modal, Button } from '@mantine/core'
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
import { showRelativeTimestamp } from 'src/utils/date'
import dayjs from 'dayjs'
import { useForm } from '@mantine/form'
import type { NewPostRequest } from 'types'
import { capitalize } from 'lodash-es'
import { isURL } from 'src/utils/url'
import HomeSideActions from 'src/views/Home/HomeSideActions'
import { emotesTextToHtml } from 'src/services/twitch'

const useStyles = createStyles((theme) => ({}))

// TODO padding before footer including image (right now empty background)
export default function Home() {
  const { classes } = useStyles()

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
      <Group style={{ padding: 0 }} position="apart">
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
            {/*
             TODO
              - allow channel emotes in titles when using post upload:
              https://dev.twitch.tv/docs/api/reference#get-channel-emotes

             */}
            <Post
              author={{
                name: 'some_user',
                description: showRelativeTimestamp(dayjs().subtract(15, 'minutes').toJSON()),
                image: null, //author.profileImage
              }}
              categories={['SIN_SONIDO', 'DIAMANTE', 'NO_SE_YO']}
              title={
                'Text with emote calieAMOR2. A very very very very very very very very very very very very very very very very very very very very very very long post'
              }
              className="post"
              footer={<div>footer div</div>}
              likes={100}
            />
            <Post
              author={{
                name: 'some_user',
                description: showRelativeTimestamp(dayjs().subtract(360, 'minutes').toJSON()),
                image: null, //author.profileImage
              }}
              categories={['SIN_SONIDO', 'RANA']}
              title={'Some title for this'}
              className="post"
              footer={<div>footer div</div>}
              likes={4324}
            />
            <Post
              author={{
                name: 'some_user',
                description: showRelativeTimestamp(dayjs().subtract(15, 'days').toJSON()),
                image: null, //author.profileImage
              }}
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
                  author={{
                    name: 'some_user',
                    description: showRelativeTimestamp(dayjs().subtract(15, 'months').toJSON()),
                    image: null, //author.profileImage
                  }}
                  categories={[]}
                  title={'Some title for this'}
                  className="post"
                  footer={<div>footer div</div>}
                  likes={2}
                />
              ))}
          </Container>
        </ScrollArea>
        <HomeSideActions
          badges={[{ emoji: 'emoji', label: 'emoji' }]}
          country="spain"
          description="description"
          title="title"
        />
      </Group>
    </>
  )
}
