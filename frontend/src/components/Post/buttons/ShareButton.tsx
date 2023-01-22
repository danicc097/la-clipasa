import { ActionIcon, Tooltip } from '@mantine/core'
import { IconShare } from '@tabler/icons'
import { useStyles } from 'src/components/Post/buttons/styles'
import type { PostResponse } from 'types'

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
