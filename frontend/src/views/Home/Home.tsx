/**
 * TODO get rid of logic in here:
 * -  <Container ... /> should go to PostsList.tsx,
 * -  homesideactions.tsx moved alongside and renamed to PostsSideActions
 *
 */

import { createContext, FC, useEffect, useRef } from 'react'
import { HEADER_HEIGHT } from '../../components/Header'
import { Alert, Container, Flex, ScrollArea, Space, createStyles, Text, LoadingOverlay } from '@mantine/core'
import { css } from '@emotion/react'
import type { Cursor, PostResponse } from 'types'
import HomeSideActions from 'src/views/Home/HomeSideActions'
import { usePostsSlice } from 'src/slices/posts'
import { usePosts } from 'src/queries/api/posts'
import { IconAlertCircle } from '@tabler/icons'
import useOnScreen from 'src/hooks/useOnScreen'
import { FOOTER_HEIGHT } from 'src/components/Footer'
import Post, { PostSkeleton } from 'src/components/Post/Post'
import { Virtuoso } from 'react-virtuoso'

const PADDING_TOP = '2rem'
const useStyles = createStyles((theme) => ({}))

export default function Home() {
  const { classes } = useStyles()
  const usePostsQuery = usePosts()
  const { getPostsQueryParams, setGetPostsQueryParams } = usePostsSlice()
  const ref = useRef(null)

  const lastScrollHeight = useRef(null)

  // refetch is used to query with old data, thats why it doesnt accept parameters,
  //  this is not the way to use react-query, add state to query key list
  // useEffect(() => {
  //   if (!usePostsQuery.isFetching) {
  //     usePostsQuery.refetch().then((res) => console.log(res.data))
  //   }
  // }, [getPostsQueryParams])

  const previousCursor = useRef<Cursor>(null)
  console.log('usePostsQuery.data?.pages')
  console.log(usePostsQuery.data?.pages)
  const posts = usePostsQuery.data?.pages?.reduce((acc, page) => acc.concat(page.data), [] as PostResponse[])
  const nextCursor = usePostsQuery.data?.pages?.[usePostsQuery.data?.pages?.length - 1].nextCursor

  const lastPostRef = useRef<HTMLDivElement>(null)

  console.log(usePostsQuery.data)
  console.log(posts)

  function renderPosts() {
    if (usePostsQuery.isFetching && !usePostsQuery.isFetchingNextPage) {
      return (
        <div
          css={css`
            min-width: 40vw;
          `}
        >
          <PostSkeleton className="post" />
          <PostSkeleton className="post" />
        </div>
      )
    }

    if (posts?.length === 0) {
      return (
        <Alert
          css={css`
            min-width: 100%;
          `}
          icon={<IconAlertCircle size={16} />}
          color="red"
        >
          No posts found
        </Alert>
      )
    }

    return (
      <div
        css={css`
          height: 100vh;
          min-width: 40vw;
          overflow: hidden;

          @media only screen and (max-width: 1200px) {
            min-width: 80vw;
          }

          @media only screen and (max-width: 600px) {
            min-width: 90vw;
          }
        `}
      >
        {/* <LoadingOverlay visible={usePostsQuery.isFetchingNextPage} overlayBlur={2} /> */}
        <Virtuoso
          // useWindowScroll
          style={{ height: '100vh', minWidth: '40vw' }}
          fixedItemHeight={300}
          data={posts}
          atBottomStateChange={(isReached) => {
            if (isReached && posts?.length > 0 && !usePostsQuery.isFetching && usePostsQuery.status !== 'loading') {
              // Fetch more data.
              // Don't forget to debounce your request (fetch).
              console.log('bottom reached')

              // FIXME is being called twice at start since it detects its at bottom
              if (nextCursor && nextCursor !== previousCursor.current && !usePostsQuery.isFetching) {
                console.log(`fetching next posts page with cursor ${nextCursor}`)
                previousCursor.current = nextCursor
                setGetPostsQueryParams({ ...getPostsQueryParams, cursor: nextCursor })

                usePostsQuery.fetchNextPage()
              }
            }
          }}
          overscan={{ main: 5, reverse: 3 }}
          itemContent={(index, post) => (
            <Post post={post} className="post" footer={<div>0 comments</div>}>
              {index === posts?.length - 1 && <div className={`trigger-post-${index}`} ref={lastPostRef} />}
            </Post>
          )}
        />
        {usePostsQuery.isFetchingNextPage && <Text className="post">Loading more...</Text>}
      </div>
    )
  }

  return (
    <>
      <Flex
        css={css`
          padding: 0;
        `}
        direction="row"
        justify={'space-between'}
      >
        {/* TODO scroll into view when refreshing: https://mantine.dev/hooks/use-scroll-into-view/ and affix
        https://mantine.dev/core/affix/ */}
        {/* <ScrollArea
          ref={ref}
          // onScroll={handleScroll}
          styles={{
            root: {
              maxHeight: `calc(100vh - ${HEADER_HEIGHT}px - ${FOOTER_HEIGHT}px - ${PADDING_TOP})`,
              alignSelf: 'flex-start',
              paddingTop: PADDING_TOP,
              overflow: 'auto',

              '&': { paddingBottom: 0 },
            },
          }}
          className="home-scrollarea"
          type="never"
        > */}
        <Container
          css={css`
            .post:not(:first-child) {
              margin-top: ${PADDING_TOP};
            }
            .post:last-child {
              margin-bottom: 20px;
            }
            max-height: calc(100vh - ${HEADER_HEIGHT}px - ${FOOTER_HEIGHT}px);
            align-self: flex-start;
            padding-top: ${PADDING_TOP};
            overflow: auto;

            & {
              padding-bottom: 0;
            }

            @media only screen and (max-width: 1200px) {
              min-width: 100%;
            }
          `}
        >
          {renderPosts()}
        </Container>
        {/* </ScrollArea> */}
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
