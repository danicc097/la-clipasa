import { ActionIcon, Text, Tooltip } from '@mantine/core'
import { openConfirmModal } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import { IconTrash } from '@tabler/icons'
import { InfiniteData, useQueryClient } from '@tanstack/react-query'
import { useContext, useState } from 'react'
import { useStyles } from 'src/components/Post/buttons/styles'
import { PostContext } from 'src/components/Post/Post'
import useAuthenticatedUser from 'src/hooks/auth/useAuthenticatedUser'
import { API_POSTS_KEY, usePostDeleteMutation } from 'src/queries/api/posts'
import { isAuthorized } from 'src/services/authorization'
import { usePostsSlice } from 'src/slices/posts'
import type { PostResponse, PostsGetResponse } from 'types'

interface DeleteButtonButtonProps {}

export default function DeleteButton({}: DeleteButtonButtonProps) {
  const post = useContext(PostContext)
  const postDeleteMutation = usePostDeleteMutation()
  const queryClient = useQueryClient()
  const { classes, theme } = useStyles()
  const { addCategoryFilter, removeCategoryFilter, getPostsQueryParams } = usePostsSlice()
  const { user, isAuthenticated } = useAuthenticatedUser()

  const [deleteButtonLoading, setDeleteButtonLoading] = useState(false)

  const canDeletePost = post.userId === user.data?.id || isAuthorized(user.data, 'MODERATOR')

  if (!canDeletePost) return null

  const openDeleteConfirmModal = () => {
    const onSuccess = (data, variables, context) => {
      showNotification({
        id: 'post-deleted',
        title: 'Post deleted',
        message: 'Post deleted successfully',
        color: 'yellow',
        icon: <IconTrash size={18} />,
        autoClose: 3000,
      })

      const { cursor, ...otherParams } = getPostsQueryParams
      queryClient.setQueryData<InfiniteData<PostsGetResponse>>([API_POSTS_KEY, `Get`, otherParams], (data) => ({
        ...data,
        pages: data.pages.map((page) => ({
          ...page,
          data: page.data.filter((p) => p.id !== post.id),
        })),
      }))
    }

    openConfirmModal({
      title: 'Delete post',
      children: <Text size="sm">This action is irreversible.</Text>,
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => {
        setDeleteButtonLoading(true)
        postDeleteMutation.mutate(String(post.id), { onSuccess })
      },
    })
  }

  const handleDeleteButtonClick = (e) => {
    e.stopPropagation()

    openDeleteConfirmModal()
  }

  return (
    <Tooltip label="Delete" arrowPosition="center" withArrow>
      <ActionIcon onClick={handleDeleteButtonClick} className={classes.action} loading={deleteButtonLoading}>
        <IconTrash size={16} color={theme.colors.red[6]} stroke={1.5} />
      </ActionIcon>
    </Tooltip>
  )
}
