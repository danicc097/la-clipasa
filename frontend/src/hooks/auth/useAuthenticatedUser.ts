import { QueryClient, useQueryClient } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { useEffect, useRef } from 'react'
import { persister } from 'src/App'
import { useUser } from 'src/queries/api/users'
import {
  useTwitchUser,
  useTwitchUserFollower,
  useTwitchUserSubscriber,
  useTwitchValidateToken,
} from 'src/queries/twitch'
import { POSTS_SLICE_PERSIST_KEY } from 'src/slices/posts'
import { TWITCH_ACCESS_TOKEN_COOKIE, UI_SLICE_PERSIST_KEY } from 'src/slices/ui'

export default function useAuthenticatedUser() {
  const mountedRef = useMountedRef()
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
    if (mountedRef.current) {
      console.log('triggered useAuthenticatedUser useEffect')
      if (!twitchValidateToken.isLoading) twitchValidateToken.refetch()
    }
  }, [twitchUser.data])

  return {
    logout,
    isSubscriber,
    isFollower,
    isAuthenticated,
    user,
  }
}

// TODO doesnt seem to clear react query
export async function logout(queryClient: QueryClient) {
  await persister.removeClient() // delete indexed db
  await queryClient.cancelQueries()
  await queryClient.invalidateQueries()
  queryClient.clear()
  Cookies.remove(TWITCH_ACCESS_TOKEN_COOKIE, {
    expires: 365,
    sameSite: 'none',
    secure: true,
  })
  localStorage.removeItem(UI_SLICE_PERSIST_KEY)
  localStorage.removeItem(POSTS_SLICE_PERSIST_KEY)
  window.location.reload()
}

/**
 * To ensure a useEffect is only called once for shared hooks.
 */
const useMountedRef = () => {
  const mountedRef = useRef(false)

  useEffect(() => {
    setTimeout(() => {
      mountedRef.current = true
    })

    return () => (mountedRef.current = null)
  }, [])

  return mountedRef
}
