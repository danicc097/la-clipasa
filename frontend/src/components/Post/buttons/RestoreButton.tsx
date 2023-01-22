import { css } from '@emotion/react'
import { ActionIcon, Tooltip } from '@mantine/core'
import { IconRefresh } from '@tabler/icons'
import { useQueryClient } from '@tanstack/react-query'
import { useStyles } from 'src/components/Post/buttons/styles'
import { usePostsSlice } from 'src/slices/posts'

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
