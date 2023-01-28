import type { PostCategory } from 'database'
import { isEqual } from 'lodash-es'
import { PostQueryParams, PostQueryParamsSort, SortDirection } from 'types'
import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export const POSTS_SLICE_PERSIST_KEY = 'posts-slice'

interface PostsState {
  lastSeenCursor: PostQueryParams['cursor']
  setLastSeenCursor: (cursor: PostsState['lastSeenCursor']) => void
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
          lastSeenCursor: undefined,
          setLastSeenCursor: (cursor: PostsState['lastSeenCursor']) =>
            set(setLastSeenCursor(cursor), false, `setLastSeenCursor`),
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

function setLastSeenCursor(cursor: PostsState['lastSeenCursor']): PostsAction {
  return (state: PostsState) => {
    return {
      ...state,
      lastSeenCursor: cursor,
    }
  }
}

function setGetPostsQueryParams(params: PostQueryParams): PostsAction {
  return (state: PostsState) => {
    const { cursor: stateCursor, ...stateOtherParams } = state.getPostsQueryParams
    const { cursor, ...otherParams } = params

    const cursorInvalidated = !isEqual(stateOtherParams, otherParams)

    return {
      ...state,
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
      ...state,
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
      ...state,
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
    let cursor // invalidate cursor by default
    if (sort === PostQueryParamsSort.LastSeenCreationDate) {
      cursor = state.lastSeenCursor
    }
    return {
      ...state,
      getPostsQueryParams: {
        ...state.getPostsQueryParams,
        sort,
        cursor,
      },
    }
  }
}

function setSortDirection(sortDirection: SortDirection): PostsAction {
  return (state: PostsState) => {
    return {
      ...state,
      getPostsQueryParams: {
        ...state.getPostsQueryParams,
        sortDirection,
        cursor: undefined, // invalidate
      },
    }
  }
}
