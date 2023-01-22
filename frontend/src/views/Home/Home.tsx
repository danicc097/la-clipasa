import { useEffect, useRef } from 'react'
import { HEADER_HEIGHT } from '../../components/Header'
import { Alert, Container, Flex, ScrollArea, Space, createStyles } from '@mantine/core'
import { css } from '@emotion/react'
import type { PostResponse } from 'types'
import HomeSideActions from 'src/views/Home/HomeSideActions'
import { usePostsSlice } from 'src/slices/posts'
import { usePosts } from 'src/queries/api/posts'
import { IconAlertCircle } from '@tabler/icons'
import useOnScreen from 'src/hooks/useOnScreen'
import { FOOTER_HEIGHT } from 'src/components/Footer'
import Post, { PostSkeleton } from 'src/components/Post/Post'

const PADDING_TOP = '2rem'
const useStyles = createStyles((theme) => ({}))

export default function Home() {
  const { classes } = useStyles()
  const usePostsQuery = usePosts()
  const { getPostsQueryParams } = usePostsSlice()
  const ref = useRef(null)

  const lastScrollHeight = useRef(null)

  // refetch is used to query with old data, thats why it doesnt accept parameters,
  //  this is not the way to use react-query, add state to query key list
  // useEffect(() => {
  //   if (!usePostsQuery.isFetching) {
  //     usePostsQuery.refetch().then((res) => console.log(res.data))
  //   }
  // }, [getPostsQueryParams])

  const posts = usePostsQuery.data?.pages?.reduce((acc, page) => acc.concat(page.data), [] as PostResponse[])
  const nextCursor = usePostsQuery.data?.pages?.[usePostsQuery.data?.pages?.length - 1].nextCursor

  const lastPostRef = useRef<HTMLDivElement>(null)
  const isLastPostOnScreen = useOnScreen(lastPostRef)

  useEffect(() => {
    console.log({ isLastPostOnScreen, lastPostRef: lastPostRef.current, nextCursor })
    console.log(nextCursor)
    // TODO fetch next page
    if (isLastPostOnScreen && usePostsQuery.status !== 'loading' && nextCursor) {
      console.log('fetching next posts page')
      usePostsQuery.fetchNextPage({ pageParam: nextCursor })
    }
  }, [isLastPostOnScreen, nextCursor, usePostsQuery.data])

  const renderPosts = () => {
    if (posts?.length === 0)
      return (
        <Alert
          css={css`
            min-width: 40vw;
          `}
          icon={<IconAlertCircle size={16} />}
          color="red"
        >
          No posts found
        </Alert>
      )

    return posts?.map((post, idx) => (
      <>
        <Post key={post.id} post={post} className="post" footer={<div>0 comments</div>}>
          {idx === posts.length - 1 && <div className={`trigger-post-${idx}`} ref={lastPostRef} />}
        </Post>
      </>
    ))
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
        <ScrollArea
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
        >
          <Container
            css={css`
              .post:not(:first-child) {
                margin-top: ${PADDING_TOP};
              }
              .post:last-child {
                margin-bottom: 20px;
              }
              width: 100%;
            `}
          >
            {renderPosts()}
            {usePostsQuery.status === 'loading' && (
              <>
                <PostSkeleton className="post" />
                <PostSkeleton className="post" />
              </>
            )}
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
