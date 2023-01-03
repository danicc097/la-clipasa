import { css } from '@emotion/react'
import { createStyles, Container, Group, ActionIcon, Image, Text } from '@mantine/core'
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram, IconBrandTwitch } from '@tabler/icons'

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 120,
    borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    minWidth: '95vw',

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    },
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      marginTop: theme.spacing.md,
    },
  },
}))

export default function Footer() {
  const { classes } = useStyles()

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Text fz="xs">
          <Group position="left" spacing={5} noWrap>
            Made with
            <Image
              src="https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_b2a90f8e209e40d697364649cf5a2d2c/default/dark/3.0"
              width={20}
              height={20}
            ></Image>
            for caliebre
          </Group>
        </Text>

        <Group spacing={0} className={classes.links} position="right" noWrap>
          <ActionIcon size="lg">
            <IconBrandTwitter size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg">
            <IconBrandYoutube size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg">
            <IconBrandInstagram size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg">
            <IconBrandTwitch size={18} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  )
}
