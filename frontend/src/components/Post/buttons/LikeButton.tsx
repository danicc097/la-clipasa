import { ActionIcon, Button, Text, Tooltip } from '@mantine/core'
import { openConfirmModal } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import { IconEdit, IconHeart, IconTrash } from '@tabler/icons'
import { InfiniteData, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useStyles } from 'src/components/Post/buttons/styles'
import ProtectedComponent from 'src/components/ProtectedComponent'
import useAuthenticatedUser from 'src/hooks/auth/useAuthenticatedUser'
import { API_POSTS_KEY, usePostPatchMutation } from 'src/queries/api/posts'
import { usePostsSlice } from 'src/slices/posts'
import { truncateIntegerToString } from 'src/utils/string'
import type { PostResponse, PostsGetResponse } from 'types'

interface LikeButtonProps {
  post: PostResponse
}

export default function LikeButton({ post }: LikeButtonProps) {
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
      queryClient.setQueryData<InfiniteData<PostsGetResponse>>([API_POSTS_KEY, `Get`, getPostsQueryParams], (data) => ({
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
        <ActionIcon component="div">{truncateIntegerToString(post._count.likedPosts)}</ActionIcon>
      </Button>
    </Tooltip>
  )
}
