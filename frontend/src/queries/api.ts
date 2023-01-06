import axios, { AxiosError } from 'axios'
import { useQuery, useQueryClient, QueryClient, useMutation } from '@tanstack/react-query'
import { TWITCH_ACCESS_TOKEN_COOKIE, UI_SLICE_PERSIST_KEY, useUISlice } from 'src/slices/ui'
import type { User } from 'database'
import { useTwitchUser } from 'src/queries/twitch'
import type { UserUpdateOrCreate } from 'types'

export function useUser() {
  const { twitchToken } = useUISlice()
  const { data: twitchUser } = useTwitchUser()
  const twitchId = twitchUser?.data[0].id

  return useQuery<User, AxiosError>({
    queryKey: [`apiUser-${twitchToken}-${twitchId}`], // any state used inside the queryFn must be part of the queryKey
    retry: (failureCount, error) => {
      if (![401, 404].includes(error.response.status) && failureCount < 2) return true
    },
    retryDelay: 1000,
    queryFn: async ({ signal }): Promise<User> => {
      const { data } = await axios.get(`${import.meta.env.VITE_URL}/api/users/${twitchId}`, {
        headers: {
          Authorization: `Bearer ${twitchToken}`,
        },
        signal,
      })
      return data
    },
  })
}

export function useUserPostMutation() {
  const { twitchToken } = useUISlice()
  const { data: twitchUser } = useTwitchUser()
  const twitchId = twitchUser?.data[0].id

  return useMutation({
    mutationKey: [`apiUserPost-${twitchToken}-${twitchId}`], // any state used inside the queryFn must be part of the queryKey
    retry: (failureCount, error: AxiosError) => {
      if (![401, 404].includes(error?.response?.status) && error.code !== 'ERR_NETWORK' && failureCount < 2) return true
    },
    retryDelay: 1000,
    mutationFn: async (body: UserUpdateOrCreate): Promise<User | AxiosError> => {
      const { data } = await axios.post(`${import.meta.env.VITE_URL}/api/users/${twitchId}`, body, {
        // proxy: import.meta.env.VITE_URL, // https://github.com/axios/axios/issues/1358#issuecomment-624709818
        headers: {
          Authorization: `Bearer ${twitchToken}`,
        },
      })
      return data
    },
  })
}
