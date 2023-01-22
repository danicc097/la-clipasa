import { ActionIcon, Tooltip } from '@mantine/core'
import { IconEdit } from '@tabler/icons'
import { useQueryClient } from '@tanstack/react-query'
import { useStyles } from 'src/components/Post/buttons/styles'
import ProtectedComponent from 'src/components/ProtectedComponent'
import { usePostsSlice } from 'src/slices/posts'
import type { PostResponse } from 'types'

interface EditButtonProps {}

export default function EditButton({}: EditButtonProps) {
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
