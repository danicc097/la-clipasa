import axios, { AxiosError, AxiosResponse } from 'axios'
import { useQuery, useQueryClient, useMutation, useInfiniteQuery } from '@tanstack/react-query'
import { useUISlice } from 'src/slices/ui'
import type { Post } from 'database'
import { useTwitchUser } from 'src/queries/twitch'
import type { PostCreateRequest, PostPatchRequest, PostsGetResponse } from 'types'
import { formatURLWithQueryParams } from 'src/utils/url'
import { usePostsSlice } from 'src/slices/posts'
import useAuthenticatedUser from 'src/hooks/auth/useAuthenticatedUser'
import { useMantineTheme } from '@mantine/core'

export const API_TWITTER_KEY = 'api-twitter'

export function useTwitterEmbed(tweetURL: string) {
  const { data: twitchUser } = useTwitchUser()
  const theme = useMantineTheme()
  const twitchId = twitchUser?.data[0].id

  return useQuery<string, AxiosError>({
    queryKey: [API_TWITTER_KEY, `Embed`, tweetURL, theme.colorScheme],
    cacheTime: 0,
    staleTime: Infinity,
    retry: (failureCount, error) => {
      if (![401, 404].includes(error.response?.status) && failureCount < 2) return true
    },
    retryDelay: 1000,
    queryFn: async ({ signal }): Promise<string> => {
      const { data } = await axios.get(
        formatURLWithQueryParams(`${import.meta.env.VITE_URL}/api/twitter/${encodeURIComponent(tweetURL)}`, {
          theme: theme.colorScheme,
        }),
        {
          headers: {
            // Authorization: `Bearer ${twitchToken}`, // always cache
          },
          signal,
        },
      )
      return data
    },
  })
}
