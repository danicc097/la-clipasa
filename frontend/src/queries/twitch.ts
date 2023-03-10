import axios, { AxiosError } from 'axios'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useUISlice } from 'src/slices/ui'
import type {
  TwitchUserFollowResponse,
  TwitchUserResponse,
  TwitchUserSubscriptionResponse,
  TwitchTokenValidateResponse,
  TwitchStreamResponse,
} from 'types'
import { formatURLWithQueryParams } from 'src/utils/url'
import { logout } from 'src/hooks/auth/useAuthenticatedUser'
import { broadcaster } from 'src/services/twitch'

export const TWITCH_KEY = 'twitch'

export function useTwitchUser() {
  const { twitchToken } = useUISlice()

  // queryClient.cancelQueries({ queryKey: [TWITCH_KEY, `User-${twitchToken}`] })
  return useQuery<TwitchUserResponse, AxiosError>({
    queryKey: [TWITCH_KEY, `User-${twitchToken}`], // any state used inside the queryFn must be part of the queryKey
    retry: (failureCount, error) => {
      if (![401, 404].includes(error.response?.status) && failureCount < 3) return true
    },
    retryDelay: 500,
    queryFn: async ({ signal }): Promise<TwitchUserResponse> => {
      if (!twitchToken) return null

      const { data } = await axios.get('https://api.twitch.tv/helix/users', {
        headers: {
          Authorization: `Bearer ${twitchToken}`,
          'Client-Id': import.meta.env.VITE_TWITCH_CLIENT_ID ?? '',
        },
        signal,
      })
      return data
    },
  })
}

export function useTwitchUserSubscriber() {
  const { twitchToken } = useUISlice()
  const { data: twitchUser } = useTwitchUser()
  const twitchId = twitchUser?.data[0].id

  return useQuery<TwitchUserSubscriptionResponse, AxiosError>({
    queryKey: [TWITCH_KEY, `UserSubscriber-${twitchToken}-${twitchId}`], // any state used inside the queryFn must be part of the queryKey
    retry: (failureCount, error) => {
      if (![401, 404].includes(error.response?.status) && failureCount < 3) return true
    },
    retryDelay: 1000,
    queryFn: async ({ signal }): Promise<TwitchUserSubscriptionResponse> => {
      if (!twitchId || twitchToken === '') return null

      const { data } = await axios.get(
        formatURLWithQueryParams('https://api.twitch.tv/helix/subscriptions/user', {
          broadcaster_id: broadcaster.id,
          user_id: twitchId,
        }),
        {
          headers: {
            Authorization: `Bearer ${twitchToken}`,
            'Client-Id': import.meta.env.VITE_TWITCH_CLIENT_ID ?? '',
          },
          signal,
        },
      )
      return data
    },
  })
}

export function useTwitchUserFollower() {
  const { twitchToken } = useUISlice()
  const { data: twitchUser } = useTwitchUser()
  const twitchId = twitchUser?.data[0].id

  return useQuery<TwitchUserFollowResponse, AxiosError>({
    queryKey: [TWITCH_KEY, `UserFollower-${twitchToken}-${twitchId}`], // any state used inside the queryFn must be part of the queryKey
    retry: (failureCount, error) => {
      if (![401, 404].includes(error.response?.status) && failureCount < 3) return true
    },
    retryDelay: 1000,
    queryFn: async ({ signal }): Promise<TwitchUserFollowResponse> => {
      if (!twitchId) return null

      const { data } = await axios.get(
        formatURLWithQueryParams('https://api.twitch.tv/helix/users/follows', {
          from_id: twitchId,
          to_id: broadcaster.id,
        }),
        {
          headers: {
            Authorization: `Bearer ${twitchToken}`,
            'Client-Id': import.meta.env.VITE_TWITCH_CLIENT_ID ?? '',
          },
          signal,
        },
      )
      return data
    },
  })
}

export function useTwitchValidateToken() {
  const { twitchToken } = useUISlice()
  const queryClient = useQueryClient()
  const { data: twitchUser } = useTwitchUser()
  const twitchId = twitchUser?.data[0].id

  return useQuery<TwitchTokenValidateResponse, AxiosError>({
    queryKey: [TWITCH_KEY, `ValidateToken-${twitchToken}-${twitchId}`], // any state used inside the queryFn must be part of the queryKey
    retry: (failureCount, error) => {
      if (![401, 404].includes(error.response?.status) && failureCount < 3) return true
    },
    staleTime: 1000 * 3600, // 1h recommended
    retryDelay: 1000,
    queryFn: async ({ signal }): Promise<TwitchTokenValidateResponse> => {
      if (!twitchId) return null

      const { data } = await axios.get('https://id.twitch.tv/oauth2/validate', {
        headers: {
          Authorization: `OAuth ${twitchToken}`,
        },
        signal,
      })
      return data
    },
    onError(err) {
      if (err.response?.status === 401) {
        logout(queryClient) // invalid token, clear everything
      }
    },
  })
}

export function useTwitchBroadcasterLive() {
  const { twitchToken } = useUISlice()
  const { data: twitchUser } = useTwitchUser()
  const twitchId = twitchUser?.data[0].id

  return useQuery<TwitchStreamResponse, AxiosError>({
    queryKey: [TWITCH_KEY, `BroadcasterLive-${twitchToken}-${twitchId}`], // any state used inside the queryFn must be part of the queryKey
    retry: (failureCount, error) => {
      if (![401, 404].includes(error.response?.status) && failureCount < 3) return true
    },
    staleTime: 1000 * 3600, // 1h recommended
    retryDelay: 1000,
    queryFn: async ({ signal }): Promise<TwitchStreamResponse> => {
      if (!twitchId) return null

      const { data } = await axios.get(
        formatURLWithQueryParams('https://api.twitch.tv/helix/streams', { user_id: broadcaster.id }),
        {
          headers: {
            Authorization: `Bearer ${twitchToken}`,
            'Client-Id': import.meta.env.VITE_TWITCH_CLIENT_ID ?? '',
          },
          signal,
        },
      )
      return data
    },
  })
}

// endpoint deprecated
// export function useTwitchFollow() {
//   const { twitchToken } = useUISlice()
//   const { data: twitchUser } = useTwitchUser()
//   const twitchId = twitchUser?.data[0].id

//   return useQuery<any, AxiosError>({
//     enabled: false,
//     queryKey: [TWITCH_KEY, `Follow-${twitchToken}-${twitchId}`], // any state used inside the queryFn must be part of the queryKey
//     retry: (failureCount, error) => {
//       if ([401,404].includes(error.response?.status)  && failureCount < 3) return true
//     },
//     retryDelay: 1000,
//     queryFn: async ({ signal }): Promise<any> => {
//       if (!twitchId) return null

//       const { data } = await axios.put(`https://api.twitch.tv/kraken/users/${twitchId}/follows/channels/${broadcaster.name}`, {
//         headers: {
//           Authorization: `Bearer ${twitchToken}`,
//           'Client-Id': import.meta.env.VITE_TWITCH_CLIENT_ID ?? '',
//         },
//         signal,
//       })
//       return data
//     },
//   })
// }
