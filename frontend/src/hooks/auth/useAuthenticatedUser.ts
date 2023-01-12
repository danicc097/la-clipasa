import { QueryClient, useQueryClient } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { persister } from 'src/App'
import { useUser } from 'src/queries/api/users'
import {
  useTwitchUser,
  useTwitchUserFollower,
  useTwitchUserSubscriber,
  useTwitchValidateToken,
} from 'src/queries/twitch'
import { TWITCH_ACCESS_TOKEN_COOKIE, UI_SLICE_PERSIST_KEY } from 'src/slices/ui'

export default function useAuthenticatedUser() {
  const queryClient = useQueryClient()
  const user = useUser()
  const twitchUser = useTwitchUser()
  const twitchUserFollower = useTwitchUserFollower()
  const twitchUserSubscriber = useTwitchUserSubscriber()
  const twitchValidateToken = useTwitchValidateToken()

  const isAuthenticated = !!twitchUser.data?.data?.[0]?.id
  const isSubscriber = !!twitchUserSubscriber.data?.data[0].broadcaster_id
  const isFollower = !!twitchUserFollower.data?.data[0].to_id

  useEffect(() => {
    if (!twitchValidateToken.isLoading) twitchValidateToken.refetch()
  }, [twitchUser.data])

  return {
    logout,
    isSubscriber,
    isFollower,
    isAuthenticated,
    user,
  }
}

export function logout(queryClient: QueryClient) {
  queryClient.cancelQueries()
  queryClient.invalidateQueries()
  queryClient.clear()
  Cookies.remove(TWITCH_ACCESS_TOKEN_COOKIE, {
    expires: 365,
    sameSite: 'none',
    secure: true,
  })
  localStorage.removeItem(UI_SLICE_PERSIST_KEY)
  persister.removeClient()
  window.location.reload()
}
