import { useState } from 'react'
import {
  createStyles,
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Tabs,
  Burger,
  Loader,
  Header as MantineHeader,
  Box,
  Tooltip,
  Badge,
  useMantineTheme,
} from '@mantine/core'
import { IconLogout, IconHeart, IconSettings, IconChevronDown } from '@tabler/icons'
import LoginTwitchButton from './LoginTwitchButton'
import { ThemeSwitcher } from './ThemeSwitcher'
import { useTwitchBroadcasterLive, useTwitchUser } from 'src/queries/twitch'
import useAuthenticatedUser, { logout } from 'src/hooks/auth/useAuthenticatedUser'
import { css } from '@emotion/react'
import broadcasterIcon from 'src/assets/caliebre-logo.png'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { broadcaster } from 'src/services/twitch'
import { useUISlice } from 'src/slices/ui'
import { declareComponentKeys } from 'i18nifty'

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    borderBottom: `1px solid ${theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[2]}`,
    padding: '30px',
    display: 'grid',
    alignContent: 'center',
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
      '.display-name': {
        display: 'none',
      },
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

  burger: {
    [theme.fn.largerThan(1200)]: {
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

interface HeaderProps {
  tabs: string[]
}

export const HEADER_HEIGHT = 60

export default function Header({ tabs }: HeaderProps) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { classes, theme, cx } = useStyles()
  // const [opened, { toggle }] = useDisclosure(false)
  const [userMenuOpened, setUserMenuOpened] = useState(false)
  const twitchUser = useTwitchUser()
  const { isFollower, isSubscriber } = useAuthenticatedUser()
  const [loginOut, setLoginOut] = useState(false)
  const username = twitchUser.data?.data[0].display_name
  const avatarUrl = twitchUser.data?.data[0].profile_image_url

  const items = tabs.map((tab) => (
    <Tabs.Tab value={tab} key={tab}>
      {tab}
    </Tabs.Tab>
  ))
  const twitchBroadcasterLive = useTwitchBroadcasterLive()
  const broadcasterLive = twitchBroadcasterLive.data?.data?.length > 0

  const { burgerOpened, setBurgerOpened } = useUISlice()
  const title = burgerOpened ? 'Close navigation' : 'Open navigation'

  const onLogout = async () => {
    setLoginOut(true)
    await logout(queryClient)
  }

  function renderAvatarMenu() {
    return twitchUser.isLoading || loginOut ? (
      <Group spacing={7} align="center">
        <Loader size={'sm'} variant="dots"></Loader>
        {loginOut ? 'Logging out...' : 'Logging in...'}
      </Group>
    ) : avatarUrl ? (
      <UnstyledButton className={cx(classes.user, { [classes.userActive]: userMenuOpened })}>
        <Group spacing={7}>
          <Avatar src={avatarUrl} alt={username} radius="xl" size={25} />
          <Text className="display-name" weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
            {username}
          </Text>
          <IconChevronDown size={12} stroke={1.5} />
        </Group>
      </UnstyledButton>
    ) : (
      <LoginTwitchButton />
    )
  }

  return (
    <>
      <Box
        css={css`
          position: sticky;
          top: 0;
          z-index: 10000;
        `}
      >
        <MantineHeader height={HEADER_HEIGHT} px="md" sx={{ height: '100%' }} className={classes.header}>
          <Group
            position="apart"
            css={css`
              align-self: center;
            `}
          >
            <Group>
              <Burger
                className={classes.burger}
                size={'sm'}
                opened={burgerOpened}
                onClick={() => setBurgerOpened(!burgerOpened)}
                title={title}
              />
              {broadcasterLive ? (
                <LiveAvatar streamTitle={twitchBroadcasterLive?.data?.data?.[0]?.title}></LiveAvatar>
              ) : (
                <div></div>
              )}
            </Group>
            <Menu
              width={220}
              position="bottom-end"
              transition="pop-top-right"
              onClose={() => setUserMenuOpened(false)}
              onOpen={() => {
                if (twitchUser.data) setUserMenuOpened(true)
              }}
            >
              <Menu.Target>{renderAvatarMenu()}</Menu.Target>
              <Menu.Dropdown
                css={css`
                  p {
                    margin: 0px;
                  }
                `}
              >
                <Menu.Item
                  disabled={isFollower}
                  onClick={() =>
                    !isFollower &&
                    Object.assign(document.createElement('a'), {
                      target: '_blank',
                      rel: 'noopener noreferrer',
                      href: `https://www.twitch.tv/${broadcaster.name}`,
                    }).click()
                  }
                  icon={<IconHeart size={20} />}
                >
                  <Text fz="s">{isFollower ? 'Already following!' : `Follow ${broadcaster.name}`}</Text>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item
                  disabled={isSubscriber}
                  onClick={() =>
                    !isSubscriber &&
                    Object.assign(document.createElement('a'), {
                      target: '_blank',
                      rel: 'noopener noreferrer',
                      href: `https://www.twitch.tv/subs/${broadcaster.name}`,
                    }).click()
                  }
                  icon={<Avatar radius="xl" src={broadcasterIcon} alt={username} size={20} />}
                >
                  <Text fz="s">
                    {isSubscriber ? (
                      'Already subscribed!'
                    ) : (
                      <strong style={{ color: '#b17cba' }}>Subscribe to {broadcaster.name}</strong>
                    )}
                  </Text>
                </Menu.Item>
                <Menu.Divider />
                <ThemeSwitcher />
                <Menu.Divider />
                <Menu.Label>Settings</Menu.Label>
                <Menu.Item icon={<IconSettings size={14} stroke={1.5} />}>Account settings</Menu.Item>
                <Menu.Divider />
                <Menu.Item icon={<IconLogout size={14} stroke={1.5} />} onClick={onLogout}>
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
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
        </MantineHeader>
      </Box>
    </>
  )
}

function LiveAvatar({ streamTitle }) {
  const theme = useMantineTheme()

  return (
    <Group position="center">
      <Tooltip label={streamTitle}>
        <a href={`https://www.twitch.tv/${broadcaster.name}`} target="_blank" rel="noopener noreferrer">
          <div
            css={css`
              position: relative;
            `}
          >
            <img
              src={broadcasterIcon}
              alt={`${broadcaster.name}`}
              height={40}
              width={40}
              css={css`
                max-width: 100%;
                color: #c11a17;
                border: 0.15rem solid;
                display: block;
                border-radius: 9000px;
                width: 100%;
              `}
            />
            <Badge
              css={css`
                position: absolute;
                bottom: -0.4rem;
                left: 50%;
                transform: translateX(-50%) scale(0.8);
                padding: 0.2rem 0.4rem;
                background-color: #c11a17;
                border-color: ${theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0]};
                border-width: 0.1rem;
              `}
              variant="filled"
              radius={5}
              size="xs"
            >
              LIVE
            </Badge>
          </div>
        </a>
      </Tooltip>
    </Group>
  )
}

export const { i18n } = declareComponentKeys<null>()({ Header })
// | { K: 'greeting'; P: { who: string } }
// | 'how are you'
// | { K: 'any questions ?'; R: JSX.Element }
// | { K: 'learn more'; P: { href: string }; R: JSX.Element }
