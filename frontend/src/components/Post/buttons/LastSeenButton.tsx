import { ActionIcon, Tooltip } from '@mantine/core'
import { IconEye } from '@tabler/icons'
import { useQueryClient } from '@tanstack/react-query'
import { useContext, useState } from 'react'
import { useStyles } from 'src/components/Post/buttons/styles'
import { PostContext } from 'src/components/Post/Post'
import useAuthenticatedUser from 'src/hooks/auth/useAuthenticatedUser'
import { usePostsSlice } from 'src/slices/posts'
import { useUISlice } from 'src/slices/ui'
import type { PostResponse } from 'types'

interface LastSeenButtonProps {}

export default function LastSeenButton({}: LastSeenButtonProps) {
  const post = useContext(PostContext)
  const queryClient = useQueryClient()
  const { isAuthenticated } = useAuthenticatedUser()
  const { classes, theme } = useStyles()
  /**
   * TODO background image if lastSeenCursor !== post.id overriding existing one (or some kind of filter)
   */
  const { setLastSeenCursor, lastSeenCursor } = usePostsSlice()

  const [lastSeenBeacon, setLastSeenBeacon] = useState(false)

  const handleLastSeenButtonClick = (e) => {
    e.stopPropagation()

    setLastSeenCursor(post.createdAt.toISOString())
  }

  if (lastSeenCursor === post.createdAt.toISOString() || !isAuthenticated) return null

  return (
    <Tooltip
      label={lastSeenCursor === post.createdAt.toISOString() ? '' : 'Mark as last seen'}
      arrowPosition="center"
      withArrow
    >
      <ActionIcon
        className={`${classes.action} ${lastSeenBeacon ? 'beacon' : ''}`}
        onClick={handleLastSeenButtonClick}
        onAnimationEnd={() => setLastSeenBeacon(false)}
      >
        <IconEye size={16} stroke={1.5} />
      </ActionIcon>
    </Tooltip>
  )
}
