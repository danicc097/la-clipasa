import {
  createStyles,
  Card,
  Image,
  ActionIcon,
  Group,
  Text,
  Avatar,
  Badge,
  DefaultMantineColor,
  MantineGradient,
  Space,
  MantineTheme,
  ColorScheme,
  Button,
} from '@mantine/core'
import { IconHeart, IconBookmark, IconShare, IconVolumeOff, IconAlertTriangle, IconAlertOctagon } from '@tabler/icons'
import emojiRana from 'src/assets/emoji-rana.png'
import emojiOro from 'src/assets/emoji-oro.png'
import emojiDiamante from 'src/assets/emoji-diamante.png'
import { css } from '@emotion/react'
import { ArrayElement, RequiredKeys, Union } from 'types'
import postDiamante from 'src/assets/post-diamante.png'
import postOro from 'src/assets/post-oro.png'
import postRana from 'src/assets/post-rana.png'
import { truncateIntegerToString } from 'src/utils/string'
import { useState } from 'react'
import { truncate } from 'lodash-es'
import { Postca } from 'database'
const useStyles = createStyles((theme) => {
  const shadowColor = theme.colorScheme === 'dark' ? '0deg 0% 10%' : '0deg 0% 50%'

  const actionStyle = {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    color: theme.colorScheme === 'light' ? theme.colors.dark[6] : theme.colors.gray[0],
    //   button: {
    //   backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    //   color: theme.colorScheme === 'light' ? theme.colors.dark[6] : theme.colors.gray[0],
    // },
    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
    }),
  }
  return {
    card: {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      minWidth: '100%',
      float: 'left',
      overflow: 'hidden',
      // should rework it with gradient shadow instead of border
      // border: `6px solid ${theme.colorScheme === 'dark' ? '#212327' : '#ddd8e4'}`,
      boxShadow: `inset 2px 2px 15px ${theme.colorScheme === 'dark' ? '#524f541d' : '#9993a436'},
    0 2px 10px ${theme.colorScheme === 'dark' ? '#3f3c4025' : '#d5d0df1c'}`,
      transition: 'all .3s ease-in-out',

      [theme.fn.smallerThan('sm')]: {
        width: '90vw',
      },

      ':hover': {
        WebkitTransition: 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)',
        transition: 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)',
        transform: 'translate3d(0px, -2px, 0)',
        cursor: 'pointer',
        boxShadow: `
          1px 2px 2px hsl(${shadowColor} / 0.333),
          2px 4px 4px hsl(${shadowColor} / 0.333),
          1px 3px 3px hsl(${shadowColor} / 0.333)
        `,
      },
    },

    title: {
      fontSize: '1.5rem',
    },

    footer: {
      padding: `${theme.spacing.xs}px ${theme.spacing.lg}px`,
      marginTop: theme.spacing.md,
      background: `${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
    },

    action: actionStyle,

    likedAction: {
      ...actionStyle,
      color: theme.colors.red[6] + ' !important',
      '*': {
        color: theme.colors.red[6] + ' !important',
      },
    },
  }
})

type PostCategory = keyof typeof PostCategories

interface PostProps {
  /**
   * Overrides a default image for a category
   */
  image?: string
  className?: string
  categories: Array<PostCategory>
  title: string
  footer: JSX.Element
  likes: number
  author: {
    name: string
    description: string
    image: string
  }
}

const categoryEmojis: Partial<Record<PostCategory, string>> = {
  MEME_ARTESANAL: emojiRana,
  DIAMANTE: emojiDiamante,
  RANA: emojiRana,
  ORO: emojiOro,
}

const EMOJI_SIZE = 16

const categoryPreEmojis: Partial<Record<PostCategory, JSX.Element>> = {}

const categoryPostEmojis: Partial<Record<PostCategory, JSX.Element>> = {
  SIN_SONIDO: <IconVolumeOff size={EMOJI_SIZE} />,
  NO_SE_YO: <IconAlertOctagon size={EMOJI_SIZE} />,
}

const categoryColorGradient: Record<PostCategory, MantineGradient> = {
  MEME_ARTESANAL: { from: 'teal', to: 'lime' },
  DIAMANTE: { from: '#1c95b1', to: '#16758b' },
  RANA: { from: 'teal', to: 'lime' },
  ORO: { from: 'yellow', to: 'yellow' },
  SIN_SONIDO: { from: 'gray', to: 'gray' },
  NO_SE_YO: { from: 'red', to: 'red' },
}

/**
 * Restricted to 1 per post.
 */
const uniqueCategories = {
  DIAMANTE: true,
  ORO: true,
  RANA: true,
}

type UniqueCategoriesKeys<T extends object> = Extract<keyof T, keyof typeof uniqueCategories>

type CardBackground = {
  image: string
  color: (theme: ColorScheme) => string
}

const uniqueCategoryBackground: Record<UniqueCategoriesKeys<typeof PostCategories>, CardBackground> = {
  DIAMANTE: {
    image: postDiamante,
    color: (theme: ColorScheme) => (theme === 'light' ? '#b5d6e2' : '#36525a'),
  },
  RANA: {
    image: postRana,
    color: (theme: ColorScheme) => (theme === 'light' ? '#b4dbbd' : '#334838'),
  },
  ORO: {
    image: postOro,
    color: (theme: ColorScheme) => (theme === 'light' ? '#d9d3a1' : '#2f2b22'),
  },
}

/**
 * Interesting possiblities:
 *  - broadcast polls for each post (just for admin or moderator)
 *
 */
export default function Post(props: PostProps) {
  const { classes, theme } = useStyles()
  const cardBackground: CardBackground =
    uniqueCategoryBackground[props.categories.find((c) => uniqueCategoryBackground[c])]
  const cardBackgroundImage = props.image ? props.image : cardBackground ? cardBackground.image : 'auto'
  const cardBackgroundColor = props.image ? 'auto' : cardBackground ? cardBackground.color(theme.colorScheme) : 'auto'
  const [saveBeacon, setSaveBeacon] = useState(false)
  const [likeBeacon, setLikeBeacon] = useState(false)
  const [hasLiked, setHasLiked] = useState(true)
  const [hasSaved, setHasSaved] = useState(false)

  function renderFooter() {
    return (
      <Card.Section className={classes.footer}>
        <Group position="apart">
          <Text size="xs" color="dimmed">
            {props.footer}
          </Text>
          <Group spacing={8}>
            <Button
              classNames={{
                root: hasLiked ? classes.likedAction : classes.action,
              }}
              className={hasLiked && likeBeacon ? 'beacon' : ''}
              onClick={(e) => {
                setHasLiked(!hasLiked)
                setLikeBeacon(true)
              }}
              onAnimationEnd={() => setLikeBeacon(false)}
              size="xs"
              leftIcon={
                <IconHeart
                  size={18}
                  color={theme.colors.red[6]}
                  stroke={1.5}
                  {...(hasLiked && { fill: theme.colors.red[6] })}
                />
              }
            >
              <ActionIcon>{truncateIntegerToString(props.likes)}</ActionIcon>
            </Button>
            <ActionIcon
              className={`${classes.action} ${hasSaved && saveBeacon ? 'beacon' : ''}`}
              onClick={(e) => {
                setHasSaved(!hasSaved)
                setSaveBeacon(true)
              }}
              onAnimationEnd={() => setSaveBeacon(false)}
            >
              <IconBookmark
                size={18}
                color={theme.colors.yellow[6]}
                stroke={1.5}
                {...(hasSaved && { fill: theme.colors.yellow[6] })}
              />
            </ActionIcon>
            <ActionIcon className={classes.action}>
              <IconShare size={16} color={theme.colors.blue[6]} stroke={1.5} />
            </ActionIcon>
          </Group>
        </Group>
      </Card.Section>
    )
  }

  function renderCategories() {
    return (
      <Group position="left">
        {props.categories.map((category, i) => (
          <Badge
            onClick={() => {
              null
            }}
            key={i}
            variant="gradient"
            gradient={categoryColorGradient[category] ?? null}
            css={css`
              display: flex;
              justify-content: space-between;
              align-items: center;
              cursor: pointer;

              :hover {
                filter: brightness(1.2);
              }
            `}
          >
            <div
              css={css`
                display: flex;
                align-items: center;
                justify-content: center;

                *:not(:first-child) {
                  margin-left: 3px;
                }
              `}
            >
              {categoryEmojis[category] && (
                <img src={categoryEmojis[category]} height={EMOJI_SIZE} width={EMOJI_SIZE} />
              )}
              <div>{PostCategories[category] ?? category}</div>
              {categoryPostEmojis[category]}
              {categoryEmojis[category] && (
                <img src={categoryEmojis[category]} height={EMOJI_SIZE} width={EMOJI_SIZE} />
              )}
            </div>
          </Badge>
        ))}
      </Group>
    )
  }

  function renderMetadata() {
    return (
      <Group mt="lg">
        {/* TODO twitch GET /users?<...> and replace with profile image */}
        <Avatar src={props.author.image} radius="sm" />
        <div>
          <Text weight={500}>{props.author.name}</Text>
          <Text size="xs" color="dimmed">
            {props.author.description}
          </Text>
        </div>
      </Group>
    )
  }

  function renderTitle() {
    return (
      <Text
        weight={700}
        className={classes.title}
        mt="xs"
        css={css`
          padding-right: 3rem; // leave space for bg decorations
        `}
      >
        {truncate(props.title, { length: 100 })}
      </Text>
    )
  }

  // TODO skeleton https://mantine.dev/core/skeleton/
  return (
    <Card
      p="lg"
      radius={12}
      className={`${classes.card} ${props.className ?? ''}`}
      /* move to classes */
      css={css`
        background-repeat: no-repeat;
        background-size: 300px;
        background-position: right top;
        background-clip: padding-box;
        background-image: url(${cardBackgroundImage});
        background-color: ${cardBackgroundColor};
        background-clip: padding-box;

        animation: 0.4s ease-out 0s 1 animateIn;

        @keyframes animateIn {
          0% {
            transform: translate3d(0px, 15px, 0) scale(0.8);
            filter: blur(3px);
            opacity: var(0.7);
            transition: opacity 0.3s;
          }
        }
      `}
    >
      {props.categories.length > 0 && renderCategories()}
      {renderTitle()}
      {renderMetadata()}
      {renderFooter()}
    </Card>
  )
}
