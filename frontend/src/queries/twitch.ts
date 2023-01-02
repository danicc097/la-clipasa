import axios, { AxiosError } from 'axios'
import { useQuery, useQueryClient, QueryClient } from '@tanstack/react-query'
import { useUISlice } from 'src/slices/ui'
import { useEffect } from 'react'
import type { TwitchUserFollowResponse, TwitchUserResponse, TwitchUserSubscriptionResponse } from 'shared-types'
import { formatURLWithQueryParams } from 'src/utils/url'

const broadcasterId = 52341091 // alternatively check every time we log in. can GET more than user with &login=<loginname>

export function useTwitchUser() {
  const { twitchToken } = useUISlice()

  // queryClient.cancelQueries({ queryKey: [`twitchUser-${twitchToken}`] })
  return useQuery<TwitchUserResponse, AxiosError>({
    queryKey: [`twitchUser-${twitchToken}`], // any state used inside the queryFn must be part of the queryKey
    retry: (failureCount, error) => {
      if (error.response.status !== 401 && failureCount < 3) return true
    },
    retryDelay: 1000,
    queryFn: async ({ signal }): Promise<TwitchUserResponse> => {
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
  const userId = twitchUser?.data[0].id

  // queryClient.cancelQueries({ queryKey: [`twitchUser-${twitchToken}`] })
  return useQuery<TwitchUserSubscriptionResponse, AxiosError>({
    queryKey: [`twitchUserSubscriber-${twitchToken}-${userId}`], // any state used inside the queryFn must be part of the queryKey
    retry: (failureCount, error) => {
      if (error.response.status !== 401 && failureCount < 3) return true
    },
    retryDelay: 1000,
    queryFn: async ({ signal }): Promise<TwitchUserSubscriptionResponse> => {
      if (!userId) return

      const { data } = await axios.get(
        formatURLWithQueryParams('https://api.twitch.tv/helix/subscriptions/user', {
          broadcaster_id: broadcasterId,
          user_id: userId,
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
  const userId = twitchUser?.data[0].id

  // queryClient.cancelQueries({ queryKey: [`twitchUser-${twitchToken}`] })
  return useQuery<TwitchUserFollowResponse, AxiosError>({
    queryKey: [`twitchUserFollower-${twitchToken}-${userId}`], // any state used inside the queryFn must be part of the queryKey
    retry: (failureCount, error) => {
      if (error.response.status !== 401 && failureCount < 3) return true
    },
    retryDelay: 1000,
    queryFn: async ({ signal }): Promise<TwitchUserFollowResponse> => {
      if (!userId) return

      const { data } = await axios.get(
        formatURLWithQueryParams('https://api.twitch.tv/helix/users/follows', {
          from_id: userId,
          to_id: broadcasterId,
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
