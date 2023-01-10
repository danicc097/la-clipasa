import type { PostCategory } from 'database'
import Cookies from 'js-cookie'
import { clone, filter } from 'lodash-es'
import type { PostQueryParams } from 'types'
import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export const POSTS_SLICE_PERSIST_KEY = 'posts-slice'

interface PostsState {
  getPostsQueryParams: PostQueryParams
  setGetPostsQueryParams: (params: PostQueryParams) => void
  addCategoryFilter: (category: PostCategory) => void
  removeCategoryFilter: (category: PostCategory) => void
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
          addCategoryFilter: (category: PostCategory) => set(addCategoryFilter(category), false, `addCategoryFilter`),
          removeCategoryFilter: (category: PostCategory) =>
            set(removeCategoryFilter(category), false, `removeCategoryFilter`),
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

function removeCategoryFilter(category: PostCategory): PostsAction {
  return (state: PostsState) => {
    const categories = state.getPostsQueryParams.categories?.filter((c) => c !== category)

    return {
      getPostsQueryParams: {
        ...state.getPostsQueryParams,
        categories,
      },
    }
  }
}

function addCategoryFilter(category: PostCategory): PostsAction {
  return (state: PostsState) => {
    const categories = [...state.getPostsQueryParams.categories]
    if (categories.indexOf(category) === -1) categories.push(category)

    return {
      getPostsQueryParams: {
        ...state.getPostsQueryParams,
        categories,
      },
    }
  }
}
