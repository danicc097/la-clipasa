import axios, { AxiosError, AxiosResponse } from 'axios'
import { useQuery, useQueryClient, useMutation, useInfiniteQuery } from '@tanstack/react-query'
import { useUISlice } from 'src/slices/ui'
import type { Post } from 'database'
import { useTwitchUser } from 'src/queries/twitch'
import type { PostCreateRequest, PostPatchRequest, PostsGetResponse } from 'types'
import { formatURLWithQueryParams } from 'src/utils/url'
import { usePostsSlice } from 'src/slices/posts'

export const API_POSTS_KEY = 'api-posts'

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
    queryKey: [API_POSTS_KEY, `Get`, getPostsQueryParams], // any state used inside the queryFn must be part of the queryKey
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
    queryKey: [API_POSTS_KEY, `GetById-${twitchToken}-${twitchId}`], // any state used inside the queryFn must be part of the queryKey
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
    mutationKey: [API_POSTS_KEY, `Create-${twitchToken}`], // any state used inside the queryFn must be part of the queryKey
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
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [API_POSTS_KEY, `Patch-${twitchToken}`], // any state used inside the queryFn must be part of the queryKey
    retry: false,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ predicate: (query) => query.queryKey[0] === API_POSTS_KEY })
    },
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
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [API_POSTS_KEY, `Delete-${twitchToken}`], // any state used inside the queryFn must be part of the queryKey
    retry: false,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ predicate: (query) => query.queryKey[0] === API_POSTS_KEY })
    },
    mutationFn: async (postId: string): Promise<AxiosResponse> => {
      return await axios.delete(`${import.meta.env.VITE_URL}/api/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${twitchToken}`,
        },
      })
    },
  })
}
