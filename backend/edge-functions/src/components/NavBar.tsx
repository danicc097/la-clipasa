import { useState } from 'react'
import { createStyles, Container, Avatar, UnstyledButton, Group, Text, Menu, Tabs, Burger } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import {
  IconLogout,
  IconHeart,
  IconStar,
  IconMessage,
  IconSettings,
  IconPlayerPause,
  IconTrash,
  IconSwitchHorizontal,
  IconChevronDown,
} from '@tabler/icons'
import LoginTwitchButton from './LoginTwitchButton'
import { ThemeSwitcher } from '../hooks/ThemeSwitcher'
import Cookies from 'js-cookie'

const useStyles = createStyles((theme) => ({
  header: {
    paddingTop: theme.spacing.sm,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    borderBottom: `1px solid ${theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[2]}`,
    marginBottom: 120,
  },

  mainSection: {
    paddingBottom: theme.spacing.sm,
  },

  user: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    },

    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('xs')]: {
      display: 'none',
    },
  },

  userActive: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },

  tabs: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  tabsList: {
    borderBottom: '0 !important',
  },

  tab: {
    fontWeight: 500,
    height: 38,
    backgroundColor: 'transparent',

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
    },

    '&[data-active]': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2],
    },
  },
}))

interface NavBarProps {
  tabs: string[]
  avatarUrl: string
}

export default function NavBar({ tabs, avatarUrl }: NavBarProps) {
  const { classes, theme, cx } = useStyles()
  const [opened, { toggle }] = useDisclosure(false)
  const [userMenuOpened, setUserMenuOpened] = useState(false)

  const items = tabs.map((tab) => (
    <Tabs.Tab value={tab} key={tab}>
      {tab}
    </Tabs.Tab>
  ))

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection}>
        <Group position="apart">
          <IconHeart size={28} color="red" fill="red" />

          <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />

          <Menu
            width={260}
            position="bottom-end"
            transition="pop-top-right"
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
          >
            <Menu.Target>
              {avatarUrl === '' ? (
                <LoginTwitchButton />
              ) : (
                <UnstyledButton className={cx(classes.user, { [classes.userActive]: userMenuOpened })}>
                  <Group spacing={7}>
                    <Avatar src={avatarUrl} alt={'twitch_username'} radius="xl" size={20} />
                    <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                      {'twitch_username'}
                    </Text>
                    <IconChevronDown size={12} stroke={1.5} />
                  </Group>
                </UnstyledButton>
              )}
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item icon={<IconHeart size={14} color={theme.colors.red[6]} stroke={1.5} />}>Liked posts</Menu.Item>
              <Menu.Item icon={<IconStar size={14} color={theme.colors.yellow[6]} stroke={1.5} />}>
                Saved posts
              </Menu.Item>

              <Menu.Divider />
              <ThemeSwitcher />
              <Menu.Divider />
              <Menu.Label>Settings</Menu.Label>
              <Menu.Item icon={<IconSettings size={14} stroke={1.5} />}>Account settings</Menu.Item>
              <Menu.Divider />
              <Menu.Item
                icon={<IconLogout size={14} stroke={1.5} />}
                onClick={() => {
                  Cookies.remove('twitchAccessToken', {
                    expires: 365,
                    sameSite: 'none',
                    secure: true,
                  })
                  window.location.reload()
                }}
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Container>
      <Container>
        <Tabs
          defaultValue="Home"
          variant="outline"
          classNames={{
            root: classes.tabs,
            tabsList: classes.tabsList,
            tab: classes.tab,
          }}
        >
          <Tabs.List>{items}</Tabs.List>
        </Tabs>
      </Container>
    </div>
  )
}
