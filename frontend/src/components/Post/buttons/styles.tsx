import { createStyles, CSSObject } from '@mantine/core'

export const useStyles = createStyles((theme) => {
  const shadowColor = theme.colorScheme === 'dark' ? '0deg 0% 10%' : '0deg 0% 50%'
  const footerBackground = `${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`

  const actionStyle: CSSObject = {
    border: 0,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    color: theme.colorScheme === 'light' ? theme.colors.dark[6] : theme.colors.gray[0],
    //   button: {
    //   backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    //   color: theme.colorScheme === 'light' ? theme.colors.dark[6] : theme.colors.gray[0],
    // },
    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
    }),

    ':disabled': {
      background: footerBackground,
    },
  }

  return {
    action: actionStyle,

    categoryAction: {
      ...actionStyle,
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3],
    },

    likedAction: {
      ...actionStyle,
      color: theme.colors.red[6] + ' !important',
      '*': {
        color: theme.colors.red[6] + ' !important',
      },
    },
  }
})
