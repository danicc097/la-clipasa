import { useEffect, useState } from 'react'
import Posts from '../../components/Post.old'
import Post, { PostSkeleton } from '../../components/Post'
import Cookies from 'js-cookie'
import Header, { HEADER_HEIGHT } from '../../components/Header'
import {
  Checkbox,
  Code,
  Container,
  Flex,
  Group,
  ScrollArea,
  Skeleton,
  Space,
  Text,
  TextInput,
  createStyles,
  useMantineTheme,
} from '@mantine/core'
import useAuthenticatedUser from 'src/hooks/auth/useAuthenticatedUser'
import { css } from '@emotion/react'
import { showRelativeTimestamp } from 'src/utils/date'
import dayjs from 'dayjs'
import { useForm } from '@mantine/form'
import type { PostCreateRequest, PostQueryParams } from 'types'
import { capitalize, random } from 'lodash-es'
import { isURL } from 'src/utils/url'
import HomeSideActions from 'src/views/Home/HomeSideActions'
import { emotesTextToHtml } from 'src/services/twitch'
import { declareComponentKeys } from 'i18nifty'
import { usePostsSlice } from 'src/slices/posts'
import { usePosts } from 'src/queries/api/posts'

const PADDING_TOP = '2rem'
const useStyles = createStyles((theme) => ({}))

// TODO padding before footer including image (right now empty background)
export default function Home() {
  const { classes } = useStyles()
  const usePostsQuery = usePosts()
  const { getPostsQueryParams } = usePostsSlice()

  // refetch is used to query with old data, thats why it doesnt accept parameters,
  //  this is not the way to use react-query, add state to query key list
  // useEffect(() => {
  //   if (!usePostsQuery.isFetching) {
  //     usePostsQuery.refetch().then((res) => console.log(res.data))
  //   }
  // }, [getPostsQueryParams])

  const renderPosts = () => {
    return usePostsQuery.data?.map((post) => (
      <Post key={post.id} post={post} className="post" footer={<div>3 comments</div>} />
    ))
  }

  return (
    <>
      <Flex
        css={css`
          padding: 0;
          .home-scrollarea {
            /* max-height: calc(100vh - ${HEADER_HEIGHT}px - 54px) !important; */
          }
        `}
        direction="row"
        justify={'space-between'}
      >
        <ScrollArea
          styles={{
            root: {
              maxHeight: `calc(100vh - ${HEADER_HEIGHT}px - 54px - ${PADDING_TOP})`, // TODO footer height const
              alignSelf: 'flex-start',
              paddingTop: PADDING_TOP,
              overflow: 'auto',

              '&': { paddingBottom: 0 },
            },
          }}
          className="home-scrollarea"
          type="never"
        >
          <Container
            css={css`
              .post:not(:first-child) {
                margin-top: ${PADDING_TOP};
              }
              width: 100%;
            `}
          >
            {renderPosts()}
            <PostSkeleton className="post" />
            <PostSkeleton className="post" />
          </Container>
        </ScrollArea>
        <Space p={5} />
        <HomeSideActions
          css={css`
            padding-top: ${PADDING_TOP};
            @media only screen and (max-width: 1200px) {
              display: none;
            }
          `}
        />
      </Flex>
    </>
  )
}
