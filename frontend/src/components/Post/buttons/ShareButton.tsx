import { ActionIcon, Button, Text, Tooltip } from '@mantine/core'
import { openConfirmModal } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import { IconEdit, IconHeart, IconShare, IconTrash } from '@tabler/icons'
import { InfiniteData, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useStyles } from 'src/components/Post/buttons/styles'
import ProtectedComponent from 'src/components/ProtectedComponent'
import useAuthenticatedUser from 'src/hooks/auth/useAuthenticatedUser'
import { API_POSTS_KEY, usePostPatchMutation } from 'src/queries/api/posts'
import { usePostsSlice } from 'src/slices/posts'
import { truncateIntegerToString } from 'src/utils/string'
import type { PostResponse, PostsGetResponse } from 'types'

interface ShareButtonProps {
  post: PostResponse
}

export default function ShareButton({ post }: ShareButtonProps) {
  const { classes, theme } = useStyles()

  return (
    <Tooltip label="Share" arrowPosition="center" withArrow>
      <ActionIcon
        className={classes.action}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <IconShare size={16} color={theme.colors.blue[6]} stroke={1.5} />
      </ActionIcon>
    </Tooltip>
  )
}
