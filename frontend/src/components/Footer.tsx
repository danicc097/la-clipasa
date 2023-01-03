import { css } from '@emotion/react'
import { createStyles, Container, Group, ActionIcon, Image, Text, Tooltip } from '@mantine/core'
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram, IconBrandTwitch } from '@tabler/icons'
import { broadcaster } from 'src/services/twitch'

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
          <Tooltip label={`Follow caliebre on Twitter`}>
            <ActionIcon size="lg">
              <a href="https://www.twitter.com/caliebre" target="_blank" rel="noopener noreferrer">
                <IconBrandTwitter size={18} stroke={1.5} color="#2d8bb3" />
              </a>
            </ActionIcon>
          </Tooltip>
          <Tooltip label={`Follow caliebre on YouTube`}>
            <ActionIcon size="lg">
              <a href="https://youtube.com/caliebre" target="_blank" rel="noopener noreferrer">
                <IconBrandYoutube size={18} stroke={1.5} color="#d63808" />
              </a>
            </ActionIcon>
          </Tooltip>
          <Tooltip label={`Follow caliebre on Instagram`}>
            <ActionIcon size="lg">
              <a href="http://www.instagram.com/caliebre" target="_blank" rel="noopener noreferrer">
                <IconBrandInstagram size={18} stroke={1.5} color="#e15d16" />
              </a>
            </ActionIcon>
          </Tooltip>
          <Tooltip label={`Follow caliebre on Twitch`}>
            <ActionIcon size="lg">
              <a href="https://www.twitch.tv/caliebre" target="_blank" rel="noopener noreferrer">
                <IconBrandTwitch size={18} stroke={1.5} color="#a970ff" />
              </a>
            </ActionIcon>
          </Tooltip>
        </Group>
      </Container>
    </div>
  )
}
