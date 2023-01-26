/**
 * TODO get rid of logic in here:
 * -  <Container ... /> should go to PostsList.tsx,
 * -  homesideactions.tsx moved alongside and renamed to PostsSideActions
 *
 */

import { createContext, FC, useEffect, useRef } from 'react'
import { HEADER_HEIGHT } from '../../components/Header'
import { Alert, Container, Flex, ScrollArea, Space, createStyles } from '@mantine/core'
import { css } from '@emotion/react'
import type { Cursor, PostResponse } from 'types'
import HomeSideActions from 'src/views/Home/HomeSideActions'
import { usePostsSlice } from 'src/slices/posts'
import { usePosts } from 'src/queries/api/posts'
import { IconAlertCircle } from '@tabler/icons'
import useOnScreen from 'src/hooks/useOnScreen'
import { FOOTER_HEIGHT } from 'src/components/Footer'
import Post, { PostSkeleton } from 'src/components/Post/Post'
import {
  CellMeasurer as _CellMeasurer,
  CellMeasurerCache,
  List as _List,
  ListProps,
  AutoSizerProps,
  CellMeasurerProps,
  WindowScroller as _WindowScroller,
  WindowScrollerProps,
  ListRowRenderer,
} from 'react-virtualized'
import AutoSizer from 'react-virtualized-auto-sizer'
import { Virtuoso } from 'react-virtuoso'

const List = _List as unknown as FC<ListProps>
// const AutoSizer = _AutoSizer as unknown as FC<AutoSizerProps>
const CellMeasurer = _CellMeasurer as unknown as FC<CellMeasurerProps>
const WindowScroller = _WindowScroller as unknown as FC<WindowScrollerProps>

const PADDING_TOP = '2rem'
const useStyles = createStyles((theme) => ({}))

type PostCellMeasurerCache = {
  cache: CellMeasurerCache
  rowIndex: number
  columnIndex: number
}

export const CellMeasurerCacheContext = createContext<PostCellMeasurerCache>(null)

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
  const isLastPostOnScreen = useOnScreen(lastPostRef)

  // see https://codesandbox.io/s/material-demo-forked-7bgyzr?file=/demo.js
  const cache = new CellMeasurerCache({
    defaultHeight: 280,
    fixedWidth: true,
    minHeight: 280, // attempt to fix call stack exceeded https://github.com/bvaughn/react-virtualized/issues/1606
  })

  const renderNoPosts = () => (
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

  //  TODO react-virtuoso
  // https://virtuoso.dev/endless-scrolling/
  const renderPost: ListRowRenderer = ({ index, key, style, parent, columnIndex }) => {
    return (
      // <CellMeasurerCacheContext.Provider value={{ cache, rowIndex: index, columnIndex }}>
      //   {/* apparently no hooks available to retrieve in children */}
      //   <CellMeasurer cache={cache} columnIndex={columnIndex} key={key} parent={parent} rowIndex={index}>
      //     {/* mandatory div */}
      //     <div style={style} key={key}>
      //       <Post post={posts[index]} className="post" footer={<div>0 comments</div>}>
      //         {index === posts.length - 1 && <div className={`trigger-post-${index}`} ref={lastPostRef} />}
      //       </Post>
      //     </div>
      //   </CellMeasurer>
      // </CellMeasurerCacheContext.Provider>

      <></>
    )
  }

  const renderPosts = () => {
    return (
      // TODO find a way to auto fit instead of variadic width based on media:
      // https://codesandbox.io/s/3vnx878jk5?file=/index.js:117-171
      // see https://github.com/bvaughn/react-virtualized/blob/master/docs/List.md
      // see https://github.com/bvaughn/react-virtualized/blob/master/docs/usingAutoSizer.md
      // TODO investigate https://github.com/bvaughn/react-virtualized/blob/master/docs/WindowScroller.md
      // for scrollToIndex on page refreshing
      // TODO rerender on viewport event https://stackoverflow.com/questions/19014250/rerender-view-on-browser-resize-with-react
      <div
        css={css`
          height: 100vh;
          min-width: 40vw;
          overflow: hidden;

          @media only screen and (max-width: 1200px) {
            min-width: 100%;
          }
        `}
      >
        <AutoSizer
          css={css`
            min-width: 40vw;

            @media only screen and (max-width: 1200px) {
              min-width: 95vw;
            }
          `}
        >
          {({ height, width }) => (
            // FIXME  Maximum update depth exceeded.
            <List
              width={width}
              height={height}
              rowCount={posts?.length ?? 0}
              rowHeight={cache.rowHeight}
              deferredMeasurementCache={cache}
              noRowsRenderer={renderNoPosts}
              rowRenderer={renderPost}
              overscanRowCount={5}
            />
          )}
        </AutoSizer>
      </div>
    )
  }

  console.log(usePostsQuery.data)
  console.log(posts)

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
          {/* {renderPosts()} */}
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
            <Virtuoso
              // useWindowScroll
              style={{ height: '100vh', minWidth: '40vw' }}
              fixedItemHeight={300}
              data={posts}
              atBottomStateChange={(isReached) => {
                if (isReached) {
                  // Fetch more data.
                  // Don't forget to debounce your request (fetch).
                  console.log('bottom reached')

                  setGetPostsQueryParams({ ...getPostsQueryParams, cursor: nextCursor })

                  usePostsQuery.fetchNextPage()

                  if (nextCursor && nextCursor !== previousCursor.current && !usePostsQuery.isRefetching) {
                    console.log(`fetching next posts page with cursor ${nextCursor}`)
                    previousCursor.current = nextCursor
                    setGetPostsQueryParams({ ...getPostsQueryParams, cursor: nextCursor })

                    usePostsQuery.fetchNextPage()
                    // FIXME previous pages getting lost if using getPostsQueryParams in query key but wont fetch without it
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
          </div>

          {usePostsQuery.status === 'loading' && (
            <>
              <PostSkeleton className="post" />
              <PostSkeleton className="post" />
            </>
          )}
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
