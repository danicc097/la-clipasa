import axios, { AxiosError, AxiosResponse } from 'axios'
import { useQuery, useQueryClient, QueryClient, useMutation, useInfiniteQuery } from '@tanstack/react-query'
import { TWITCH_ACCESS_TOKEN_COOKIE, UI_SLICE_PERSIST_KEY, useUISlice } from 'src/slices/ui'
import type { Post } from 'database'
import { useTwitchUser } from 'src/queries/twitch'
import type { PostCreateRequest, PostPatchRequest, PostResponse, PostsGetResponse } from 'types'
import { formatURLWithQueryParams } from 'src/utils/url'
import { usePostsSlice } from 'src/slices/posts'

/**
 *
 * see infinite scroll: https://tanstack.com/query/v4/docs/react/guides/infinite-queries
 */
export function usePosts() {
  const { twitchToken } = useUISlice()
  const { getPostsQueryParams } = usePostsSlice()

  /**
  {
    "pages": [
      {
        "data": [{...}, ...],
        "nextCursor": "2023-01-16T20:34:43.605Z"
      },
      {
        ...
      }
    ],
    "pageParams": [
      null
    ]
  }
  */
  return useInfiniteQuery<PostsGetResponse, AxiosError>({
    queryKey: [`apiGetPosts`, getPostsQueryParams], // any state used inside the queryFn must be part of the queryKey
    retry: false,
    // cacheTime: 1000 * 60 * 60, // 1h
    cacheTime: 0,
    staleTime: Infinity,
    enabled: getPostsQueryParams !== null,
    queryFn: async ({ signal, pageParam }): Promise<PostsGetResponse> => {
      if (!getPostsQueryParams) return

      const { data } = await axios.get(
        formatURLWithQueryParams(`${import.meta.env.VITE_URL}/api/posts`, getPostsQueryParams),
        {
          headers: {
            Authorization: `Bearer ${twitchToken}`,
          },
          signal,
        },
      )
      return data
    },
  })
}

export function usePostById() {
  const { twitchToken } = useUISlice()
  const { data: twitchUser } = useTwitchUser()
  const twitchId = twitchUser?.data[0].id

  return useQuery<Post, AxiosError>({
    queryKey: [`apiUser-${twitchToken}-${twitchId}`], // any state used inside the queryFn must be part of the queryKey
    retry: (failureCount, error) => {
      if (![401, 404].includes(error.response?.status) && failureCount < 2) return true
    },
    retryDelay: 1000,
    queryFn: async ({ signal }): Promise<Post> => {
      const { data } = await axios.get(`${import.meta.env.VITE_URL}/api/posts/${twitchId}`, {
        headers: {
          Authorization: `Bearer ${twitchToken}`,
        },
        signal,
      })
      return data
    },
  })
}

export function usePostCreateMutation() {
  const { twitchToken } = useUISlice()

  return useMutation({
    mutationKey: [`apiPostCreate-${twitchToken}`], // any state used inside the queryFn must be part of the queryKey
    retry: false,
    mutationFn: async (body: PostCreateRequest): Promise<Post> => {
      const { data } = await axios.post(`${import.meta.env.VITE_URL}/api/posts`, body, {
        headers: {
          Authorization: `Bearer ${twitchToken}`,
        },
      })
      return data
    },
  })
}

export function usePostPatchMutation() {
  const { twitchToken } = useUISlice()

  return useMutation({
    mutationKey: [`apiPostPatch-${twitchToken}`], // any state used inside the queryFn must be part of the queryKey
    retry: false,
    mutationFn: async ({ body, postId }: { body: PostPatchRequest; postId: string }): Promise<Post> => {
      const { data } = await axios.patch(`${import.meta.env.VITE_URL}/api/posts/${postId}`, body, {
        headers: {
          Authorization: `Bearer ${twitchToken}`,
        },
      })
      return data
    },
  })
}

// will show button if post.userId === user.id or has at least mod role
export function usePostDeleteMutation() {
  const { twitchToken } = useUISlice()

  return useMutation({
    mutationKey: [`apiPostDelete-${twitchToken}`], // any state used inside the queryFn must be part of the queryKey
    retry: false,
    mutationFn: async (postId: string): Promise<AxiosResponse> => {
      return await axios.delete(`${import.meta.env.VITE_URL}/api/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${twitchToken}`,
        },
      })
    },
  })
}
