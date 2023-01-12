import axios, { AxiosError } from 'axios'
import { useQuery, useQueryClient, QueryClient, useMutation } from '@tanstack/react-query'
import { TWITCH_ACCESS_TOKEN_COOKIE, UI_SLICE_PERSIST_KEY, useUISlice } from 'src/slices/ui'
import type { Post, User } from 'database'
import { useTwitchUser } from 'src/queries/twitch'
import type { PostCreateRequest } from 'types'
import { formatURLWithQueryParams } from 'src/utils/url'
import { usePostsSlice } from 'src/slices/posts'

/**
 *
 * see infinite scroll: https://tanstack.com/query/v4/docs/react/guides/infinite-queries
 */
export function usePosts() {
  const { twitchToken } = useUISlice()
  const { getPostsQueryParams } = usePostsSlice()

  return useQuery<Post[], AxiosError>({
    queryKey: [`apiGetPosts`, getPostsQueryParams], // any state used inside the queryFn must be part of the queryKey
    retry: false,
    // cacheTime: 1000 * 60 * 60, // 1h
    cacheTime: 0,
    enabled: getPostsQueryParams !== null,
    queryFn: async ({ signal, pageParam }): Promise<Post[]> => {
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
      if (![401, 404].includes(error.response.status) && failureCount < 2) return true
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
    retry: (failureCount, error: AxiosError) => {
      return false
    },
    retryDelay: 1000,
    mutationFn: async (body: PostCreateRequest): Promise<User> => {
      const { data } = await axios.post(`${import.meta.env.VITE_URL}/api/posts`, body, {
        headers: {
          Authorization: `Bearer ${twitchToken}`,
        },
      })
      return data
    },
  })
}
