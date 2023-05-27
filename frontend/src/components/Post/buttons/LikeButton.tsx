import { ActionIcon, Button, Tooltip } from '@mantine/core'
import { IconHeart } from '@tabler/icons'
import { InfiniteData, useQueryClient } from '@tanstack/react-query'
import { useContext, useState } from 'react'
import { useStyles } from 'src/components/Post/buttons/styles'
import { PostContext } from 'src/components/Post/Post'
import useAuthenticatedUser from 'src/hooks/auth/useAuthenticatedUser'
import { API_POSTS_KEY, usePostPatchMutation } from 'src/queries/api/posts'
import { usePostsSlice } from 'src/slices/posts'
import { truncateIntegerToString } from 'src/utils/string'
import type { PostResponse, PostsGetResponse } from 'types'

interface LikeButtonProps { }

export default function LikeButton({ }: LikeButtonProps) {
  const post = useContext(PostContext)
  const queryClient = useQueryClient()
  const { classes, theme } = useStyles()
  const { addCategoryFilter, removeCategoryFilter, getPostsQueryParams } = usePostsSlice()
  const { user, isAuthenticated } = useAuthenticatedUser()
  const postPatchMutation = usePostPatchMutation()

  const [likeBeacon, setLikeBeacon] = useState(false)

  const hasLiked = post?.likedPosts?.length > 0

  const handleLikeButtonClick = (e) => {
    e.stopPropagation()

    const onSuccess = (data, variables, context) => {
      const { cursor, ...otherParams } = getPostsQueryParams
      queryClient.setQueryData<InfiniteData<PostsGetResponse>>([API_POSTS_KEY, `Get`, otherParams], (data) => ({
        ...data,
        pages: data.pages.map((page) => ({
          ...page,
          data: page.data.map((p) => {
            if (p.id === post.id) {
              console.log('updating react query data')
              if (hasLiked) {
                p.likedPosts = []
                p._count.likedPosts = p._count.likedPosts - 1
              } else {
                p.likedPosts = [{ postId: p.id, userId: p.userId }]
                p._count.likedPosts = p._count.likedPosts + 1
              }
            }
            return p
          }),
        })),
      }))
    }

    // TODO mutation with debounce of 2 seconds
    setLikeBeacon(true)
    postPatchMutation.mutate(
      {
        postId: String(post.id),
        body: { liked: !hasLiked },
      },
      {
        onSuccess,
      },
    )
  }

  return (
    <Tooltip label="Like" arrowPosition="center" withArrow>
      <Button
        classNames={{
          root: hasLiked ? classes.likedAction : classes.action,
        }}
        disabled={!isAuthenticated}
        className={likeBeacon ? 'beacon' : ''}
        onClick={handleLikeButtonClick}
        onAnimationEnd={() => setLikeBeacon(false)}
        size="xs"
        leftIcon={
          <IconHeart
            size={18}
            color={theme.colors.red[6]}
            stroke={1.5}
            {...(hasLiked && { fill: theme.colors.red[6] })}
          />
        }
      >
        <ActionIcon component="div">{truncateIntegerToString(post._count?.likedPosts)}</ActionIcon>
      </Button>
    </Tooltip>
  )
}
