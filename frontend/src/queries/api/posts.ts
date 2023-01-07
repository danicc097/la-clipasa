import axios, { AxiosError } from 'axios'
import { useQuery, useQueryClient, QueryClient, useMutation } from '@tanstack/react-query'
import { TWITCH_ACCESS_TOKEN_COOKIE, UI_SLICE_PERSIST_KEY, useUISlice } from 'src/slices/ui'
import type { Post, User } from 'database'
import { useTwitchUser } from 'src/queries/twitch'
import type { UserUpdateOrCreateRequest } from 'types'
import { formatURLWithQueryParams } from 'src/utils/url'

export function usePosts() {
  const { twitchToken } = useUISlice()
  const { data: twitchUser } = useTwitchUser()
  const twitchId = twitchUser?.data[0].id

  return useQuery<Post[], AxiosError>({
    queryKey: [`apiUser-${twitchToken}-${twitchId}`], // any state used inside the queryFn must be part of the queryKey
    retry: (failureCount, error) => {
      if (![401, 404].includes(error.response.status) && failureCount < 2) return true
    },
    retryDelay: 1000,
    queryFn: async ({ signal }): Promise<Post[]> => {
      const { data } = await axios.get(
        formatURLWithQueryParams(`${import.meta.env.VITE_URL}/api/posts`, {
          limit: 10,
          cursor: null,
          query: '',
        }),
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

// will only be called on token renewal.
// if user needs to refresh data instantly (new sub or follow to be able to post, etc.)
// then logs out and back in
export function useUserPostMutation() {
  const { twitchToken } = useUISlice()
  const { data: twitchUser } = useTwitchUser()
  const twitchId = twitchUser?.data[0].id

  return useMutation({
    mutationKey: [`apiUserPost-${twitchToken}-${twitchId}`], // any state used inside the queryFn must be part of the queryKey
    retry: (failureCount, error: AxiosError) => {
      if (![401, 404].includes(error?.response?.status) && failureCount < 2) return true
    },
    retryDelay: 1000,
    mutationFn: async (body: UserUpdateOrCreateRequest): Promise<User> => {
      const { data } = await axios.post(`${import.meta.env.VITE_URL}/api/users/${twitchId}`, body, {
        headers: {
          Authorization: `Bearer ${twitchToken}`,
        },
      })
      return data
    },
  })
}
