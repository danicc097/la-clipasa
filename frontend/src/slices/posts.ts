import Cookies from 'js-cookie'
import type { PostQueryParams } from 'types'
import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export const POSTS_SLICE_PERSIST_KEY = 'posts-slice'

interface PostsState {
  getPostsQueryParams: PostQueryParams
  setGetPostsQueryParams: (params: PostQueryParams) => void
}

const usePostsSlice = create<PostsState>()(
  devtools(
    persist(
      (set) => {
        return {
          getPostsQueryParams: {
            titleQuery: undefined,
            limit: undefined,
            authorId: undefined,
            liked: undefined,
            saved: undefined,
            categories: undefined,
            cursor: undefined,
          },
          setGetPostsQueryParams: (params: PostQueryParams) =>
            set(setGetPostsQueryParams(params), false, `setGetPostsQueryParams`),
        }
      },
      { version: 2, name: POSTS_SLICE_PERSIST_KEY },
    ),
    { enabled: true },
  ),
)

export { usePostsSlice }

type PostsAction = (...args: any[]) => Partial<PostsState>

function setGetPostsQueryParams(params: PostQueryParams): PostsAction {
  return (state: PostsState) => {
    return {
      getPostsQueryParams: params,
    }
  }
}
