import axios, { AxiosError } from 'axios'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useUISlice } from 'src/slices/ui'
import type { User } from 'database'
import { useTwitchUser } from 'src/queries/twitch'
import type { UserUpdateOrCreateRequest } from 'types'

export const API_USERS_KEY = 'api-users'

export function useUser() {
  const { twitchToken } = useUISlice()
  const { data: twitchUser } = useTwitchUser()
  const twitchId = twitchUser?.data[0].id

  return useQuery<User, AxiosError>({
    queryKey: [API_USERS_KEY, `Get-${twitchToken}-${twitchId}`], // any state used inside the queryFn must be part of the queryKey
    retry: (failureCount, error) => {
      if (![401, 404].includes(error.response?.status) && failureCount < 2) return true
    },
    retryDelay: 1000,
    queryFn: async ({ signal }): Promise<User> => {
      if (!twitchId) return null

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

// will only be called on token renewal.
// if user needs to refresh data instantly (new sub or follow to be able to post, etc.)
// then logs out and back in
export function useUserUpdateOrCreate() {
  const { twitchToken } = useUISlice()
  const { data: twitchUser } = useTwitchUser()
  const twitchId = twitchUser?.data[0].id

  return useMutation({
    mutationKey: [API_USERS_KEY, `Post-${twitchToken}-${twitchId}`], // any state used inside the queryFn must be part of the queryKey
    retry: (failureCount, error: AxiosError) => {
      return false
    },
    retryDelay: 1000,
    mutationFn: async (body: UserUpdateOrCreateRequest): Promise<User> => {
      if (!twitchId) return

      const { data } = await axios.post(`${import.meta.env.VITE_URL}/api/users/${twitchId}`, body, {
        headers: {
          Authorization: `Bearer ${twitchToken}`,
        },
      })
      return data
    },
  })
}
