import { ActionIcon, Tooltip } from '@mantine/core'
import { IconEye } from '@tabler/icons'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useStyles } from 'src/components/Post/buttons/styles'
import { usePostsSlice } from 'src/slices/posts'
import { useUISlice } from 'src/slices/ui'
import type { PostResponse } from 'types'

interface LastSeenButtonProps {
  post: PostResponse
}

export default function LastSeenButton({ post }: LastSeenButtonProps) {
  const queryClient = useQueryClient()
  const { classes, theme } = useStyles()
  const { addCategoryFilter, removeCategoryFilter, getPostsQueryParams } = usePostsSlice()

  /**
   * TODO background image if lastSeenPostId !== post.id overriding existing one (or some kind of filter)
   */
  const { lastSeenPostId, setLastSeenPostId } = useUISlice()
  const [lastSeenBeacon, setLastSeenBeacon] = useState(false)

  const handleLastSeenButtonClick = (e) => {
    e.stopPropagation()

    setLastSeenPostId(post.id)
  }

  return lastSeenPostId !== post.id ? (
    <Tooltip label={lastSeenPostId === post.id ? '' : 'Mark as last seen'} arrowPosition="center" withArrow>
      <ActionIcon
        className={`${classes.action} ${lastSeenBeacon ? 'beacon' : ''}`}
        onClick={handleLastSeenButtonClick}
        onAnimationEnd={() => setLastSeenBeacon(false)}
      >
        <IconEye size={16} stroke={1.5} />
      </ActionIcon>
    </Tooltip>
  ) : null
}
