import { ActionIcon, Tooltip } from '@mantine/core'
import { IconShieldCheck, IconShieldOff } from '@tabler/icons'
import { InfiniteData, useQueryClient } from '@tanstack/react-query'
import { useContext, useEffect, useState } from 'react'
import { useStyles } from 'src/components/Post/buttons/styles'
import { PostContext } from 'src/components/Post/Post'
import ProtectedComponent from 'src/components/ProtectedComponent'
import { API_POSTS_KEY, usePostPatchMutation } from 'src/queries/api/posts'
import { usePostsSlice } from 'src/slices/posts'
import type { PostResponse, PostsGetResponse } from 'types'

interface ModerateButtonProps {}

export default function ModerateButton({}: ModerateButtonProps) {
  const post = useContext(PostContext)
  const queryClient = useQueryClient()
  const { classes, theme } = useStyles()
  const { addCategoryFilter, removeCategoryFilter, getPostsQueryParams } = usePostsSlice()
  const postPatchMutation = usePostPatchMutation()

  const [moderateButtonLoading, setModerateButtonLoading] = useState(false)

  useEffect(() => {
    if (!postPatchMutation.isLoading) {
      setModerateButtonLoading(false)
    }
  }, [postPatchMutation])

  const handleModerateButtonClick = (e) => {
    e.stopPropagation()

    const onSuccess = (data, variables, context) => {
      queryClient.setQueryData<InfiniteData<PostsGetResponse>>([API_POSTS_KEY, `Get`, getPostsQueryParams], (data) => ({
        ...data,
        pages: data.pages.map((page) => ({
          ...page,
          data: page.data.map((p) => {
            if (p.id === post.id) {
              console.log('updating react query data')
              p.isModerated = !p.isModerated
            }
            return p
          }),
        })),
      }))
    }
    setModerateButtonLoading(true)
    postPatchMutation.mutate(
      {
        postId: String(post.id),
        body: { isModerated: !post.isModerated },
      },
      {
        onSuccess,
      },
    )
  }

  return (
    <ProtectedComponent requiredRole="MODERATOR">
      <Tooltip label={post.isModerated ? 'Mark as not moderated' : 'Approve'} arrowPosition="center" withArrow>
        <ActionIcon
          className={classes.action}
          onClick={handleModerateButtonClick}
          disabled={moderateButtonLoading}
          loading={moderateButtonLoading}
        >
          {post.isModerated ? (
            <IconShieldOff size={16} color={'red'} stroke={1.5} />
          ) : (
            <IconShieldCheck size={16} color={'lime'} stroke={1.5} />
          )}
        </ActionIcon>
      </Tooltip>
    </ProtectedComponent>
  )
}
