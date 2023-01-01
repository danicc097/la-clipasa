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
  broadcaster_type: string
  /**
   * User's channel description.
   */
  description: string
  /**
   * User's display name.
   */
  display_name: string
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
  offline_image_url: string
  /**
   * URL of the user's profile image.
   */
  profile_image_url: string
  /**
   * User’s type: "staff", "admin", "global_mod", or "".
   */
  type: string
  /**
   * Total number of views of the user’s channel.
   */
  view_count: number
}

export function useTwitchUser() {
  const { twitchToken } = useUISlice()
  const queryClient = useQueryClient()

  queryClient.cancelQueries({ queryKey: ['twitchUser'] })
  return useQuery<TwitchUserResponse, AxiosError>({
    queryKey: ['twitchUser'],
    retry: 2,
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