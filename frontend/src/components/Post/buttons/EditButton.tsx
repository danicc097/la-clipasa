import { ActionIcon, Text, Tooltip } from '@mantine/core'
import { openConfirmModal } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import { IconEdit, IconTrash } from '@tabler/icons'
import { InfiniteData, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useStyles } from 'src/components/Post/buttons/styles'
import ProtectedComponent from 'src/components/ProtectedComponent'
import { usePostsSlice } from 'src/slices/posts'
import type { PostResponse, PostsGetResponse } from 'types'

interface EditButtonProps {
  post: PostResponse
}

export default function EditButton({ post }: EditButtonProps) {
  const queryClient = useQueryClient()
  const { classes, theme } = useStyles()
  const { addCategoryFilter, removeCategoryFilter, getPostsQueryParams } = usePostsSlice()

  const handleEditButtonClick = (e) => {
    e.stopPropagation()
  }

  return (
    <ProtectedComponent requiredRole="MODERATOR">
      <Tooltip label={'Edit'} arrowPosition="center" withArrow>
        <ActionIcon className={classes.action} onClick={handleEditButtonClick}>
          <IconEdit size={16} color={theme.colors.blue[4]} stroke={1.5} />
        </ActionIcon>
      </Tooltip>
    </ProtectedComponent>
  )
}
