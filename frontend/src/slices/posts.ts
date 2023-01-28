import type { PostCategory } from 'database'
import { isEqual } from 'lodash-es'
import { PostQueryParams, PostQueryParamsSort, SortDirection } from 'types'
import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export const POSTS_SLICE_PERSIST_KEY = 'posts-slice'

interface PostsState {
  getPostsQueryParams: PostQueryParams
  setGetPostsQueryParams: (params: PostQueryParams) => void
  addCategoryFilter: (category: PostCategory) => void
  removeCategoryFilter: (category: PostCategory) => void
  setSort: (setting: PostQueryParamsSort) => void
  setSortDirection: (setting: SortDirection) => void
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
            moderated: true,
            sort: PostQueryParamsSort.CreationDate,
            sortDirection: SortDirection.DESC,
          },
          setGetPostsQueryParams: (params: PostQueryParams) =>
            set(setGetPostsQueryParams(params), false, `setGetPostsQueryParams`),
          addCategoryFilter: (category: PostCategory) => set(addCategoryFilter(category), false, `addCategoryFilter`),
          setSort: (sort: PostQueryParamsSort) => set(setSort(sort), false, `setSort`),
          setSortDirection: (sortDirection: SortDirection) =>
            set(setSortDirection(sortDirection), false, `setSortDirection`),
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
    const { cursor: stateCursor, ...stateOtherParams } = state.getPostsQueryParams
    const { cursor, ...otherParams } = params

    const cursorInvalidated = !isEqual(stateOtherParams, otherParams)

    return {
      getPostsQueryParams: {
        ...otherParams,
        cursor: cursorInvalidated ? undefined : cursor,
      },
    }
  }
}

function removeCategoryFilter(category: PostCategory): PostsAction {
  return (state: PostsState) => {
    let categories = state.getPostsQueryParams?.categories
    if (!categories) {
      categories = []
    }
    categories = categories.filter((c) => c !== category)

    return {
      getPostsQueryParams: {
        ...state.getPostsQueryParams,
        categories,
        cursor: undefined, // invalidate
      },
    }
  }
}

function addCategoryFilter(category: PostCategory): PostsAction {
  return (state: PostsState) => {
    let categories = state.getPostsQueryParams?.categories
    if (!categories) {
      categories = []
    }

    if (categories.indexOf(category) === -1) categories.push(category)

    return {
      getPostsQueryParams: {
        ...state.getPostsQueryParams,
        categories,
        cursor: undefined, // invalidate
      },
    }
  }
}

function setSort(sort: PostQueryParamsSort): PostsAction {
  return (state: PostsState) => {
    return {
      getPostsQueryParams: {
        ...state.getPostsQueryParams,
        sort,
        cursor: undefined, // invalidate
      },
    }
  }
}

function setSortDirection(sortDirection: SortDirection): PostsAction {
  return (state: PostsState) => {
    return {
      getPostsQueryParams: {
        ...state.getPostsQueryParams,
        sortDirection,
        cursor: undefined, // invalidate
      },
    }
  }
}
