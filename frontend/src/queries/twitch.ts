import axios, { AxiosError } from 'axios'
import { useQuery, useQueryClient, QueryClient } from '@tanstack/react-query'
import { TWITCH_ACCESS_TOKEN_COOKIE, UI_SLICE_PERSIST_KEY, useUISlice } from 'src/slices/ui'
import { useEffect } from 'react'
import type {
  TwitchUserFollowResponse,
  TwitchUserResponse,
  TwitchUserSubscriptionResponse,
  TwitchTokenValidateResponse,
} from 'shared-types'
import { formatURLWithQueryParams } from 'src/utils/url'
import useAuthenticatedUser, { logout } from 'src/hooks/auth/useAuthenticatedUser'
import Cookies from 'js-cookie'

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

  return useQuery<TwitchUserSubscriptionResponse, AxiosError>({
    queryKey: [`twitchUserSubscriber-${twitchToken}-${userId}`], // any state used inside the queryFn must be part of the queryKey
    retry: (failureCount, error) => {
      if (error.response.status !== 401 && failureCount < 3) return true
    },
    retryDelay: 1000,
    queryFn: async ({ signal }): Promise<TwitchUserSubscriptionResponse> => {
      if (!userId) return null

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

  return useQuery<TwitchUserFollowResponse, AxiosError>({
    queryKey: [`twitchUserFollower-${twitchToken}-${userId}`], // any state used inside the queryFn must be part of the queryKey
    retry: (failureCount, error) => {
      if (error.response.status !== 401 && failureCount < 3) return true
    },
    retryDelay: 1000,
    queryFn: async ({ signal }): Promise<TwitchUserFollowResponse> => {
      if (!userId) return null

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

export function useTwitchValidateToken() {
  const { twitchToken } = useUISlice()
  const queryClient = useQueryClient()
  const { data: twitchUser } = useTwitchUser()
  const userId = twitchUser?.data[0].id

  return useQuery<TwitchTokenValidateResponse, AxiosError>({
    queryKey: [`twitchValidateToken-${twitchToken}-${userId}`], // any state used inside the queryFn must be part of the queryKey
    retry: (failureCount, error) => {
      if (error.response.status !== 401 && failureCount < 3) return true
    },
    staleTime: 1000 * 3600, // 1h recommended
    retryDelay: 1000,
    queryFn: async ({ signal }): Promise<TwitchTokenValidateResponse> => {
      if (!userId) return null

      const { data } = await axios.get('https://id.twitch.tv/oauth2/validate', {
        headers: {
          Authorization: `OAuth ${twitchToken}`,
        },
        signal,
        method: 'POST',
      })
      return data
    },
    onError(err) {
      if (err.response.status === 401) {
        logout(queryClient) // invalid token, clear everything
      }
    },
  })
}
