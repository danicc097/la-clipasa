import axios, { AxiosError } from 'axios'
import { useQuery, useQueryClient, QueryClient } from '@tanstack/react-query'
import { useUISlice } from 'src/slices/ui'

type TwitchUserResponse = {
  data: User[]
}

type User = {
  /**
   * User’s broadcaster type: "partner", "affiliate", or "".
   */
  broadcasterType: string
  /**
   * User's channel description.
   */
  description: string
  /**
   * User's display name.
   */
  displayName: string
  /**
   * User’s email address. Returned if the request includes the user:read:edit scope.
   */
  email?: string
  /**
   * User's ID.
   */
  id: string
  /**
   * User's login name.
   */
  login: string
  /**
   * URL of the user's offline image.
   */
  offlineImageUrl: string
  /**
   * URL of the user's profile image.
   */
  profileImageUrl: string
  /**
   * User’s type: "staff", "admin", "global_mod", or "".
   */
  type: string
  /**
   * Total number of views of the user’s channel.
   */
  viewCount: number
}

export function useTwitchUser() {
  const { twitchToken } = useUISlice()
  const queryClient = useQueryClient()

  queryClient.cancelQueries({ queryKey: ['twitchUser'] })
  // TODO AbortSignal else retries will continue.
  return useQuery<TwitchUserResponse, AxiosError>({
    queryKey: ['twitchUser'],
    retry: 1,
    retryDelay: 3000,
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
