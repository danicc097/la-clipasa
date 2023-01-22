import { css } from '@emotion/react'
import { ActionIcon, Text, Tooltip } from '@mantine/core'
import { openConfirmModal } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import { IconEdit, IconRefresh, IconTrash } from '@tabler/icons'
import { InfiniteData, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useStyles } from 'src/components/Post/buttons/styles'
import ProtectedComponent from 'src/components/ProtectedComponent'
import { usePostsSlice } from 'src/slices/posts'
import type { PostsGetResponse } from 'types'

interface RestoreButtonProps {
  postId: number
}

export default function RestoreButton({ postId }: RestoreButtonProps) {
  const queryClient = useQueryClient()
  const { classes, theme } = useStyles()
  const { addCategoryFilter, removeCategoryFilter, getPostsQueryParams } = usePostsSlice()

  return (
    <Tooltip label="Restore" arrowPosition="center" withArrow>
      <ActionIcon
        css={css`
          position: absolute;
          right: 20px;
        `}
        onClick={(e) => {
          e.stopPropagation()
          console.log('handle restore ')
          // in case we deem deletedAt useful later on.
        }}
        className={`${classes.action} restore-button`}
        size={'lg'}
        p={5}
      >
        <IconRefresh color="green" size={32} stroke={1.5} />
      </ActionIcon>
    </Tooltip>
  )
}
