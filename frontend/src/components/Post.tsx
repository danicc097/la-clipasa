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
} from '@mantine/core'
import { IconHeart, IconBookmark, IconShare } from '@tabler/icons'
import emojiRana from 'src/assets/emoji-rana.png'
import emojiOro from 'src/assets/emoji-oro.png'
import emojiDiamante from 'src/assets/emoji-diamante.png'
import { css } from '@emotion/react'
import { ArrayElement, PostCategories, RequiredKeys, Union } from 'shared-types'
import postDiamante from 'src/assets/post-diamante.png'
import postOro from 'src/assets/post-oro.png'
import postRana from 'src/assets/post-rana.png'

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    minWidth: '50vw',
    // border: `6px solid ${theme.colorScheme === 'dark' ? '#212327' : '#ddd8e4'}`,
    boxShadow: `inset 2px 2px 15px ${theme.colorScheme === 'dark' ? '#524f541d' : '#9993a436'},
    0 2px 10px ${theme.colorScheme === 'dark' ? '#3f3c4025' : '#d5d0df1c'}`,
    // boxShadow: `0 15px 10px -10px ${theme.colorScheme === 'dark' ? '#7d6e9335' : '#22212460'}`,

    [theme.fn.smallerThan('sm')]: {
      minWidth: '90vw',
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  footer: {
    padding: `${theme.spacing.xs}px ${theme.spacing.lg}px`,
    marginTop: theme.spacing.md,
    borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
  },

  action: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
    }),
  },
}))

interface ArticleCardFooterProps {
  /**
   * Overrides a default image for a category
   */
  image?: string
  categories: Array<keyof typeof PostCategories>
  title: string
  footer: JSX.Element
  author: {
    name: string
    description: string
    image: string
  }
}

const categoryEmojis: Record<PostCategories, string> = {
  'MEME ARTESANAL': emojiRana,
  DIAMANTE: emojiDiamante,
  RANA: emojiRana,
  ORO: emojiOro,
  'SIN SONIDO': emojiRana,
  'NO SÉ YO': emojiRana,
}

const categoryColorGradient: Record<PostCategories, MantineGradient> = {
  'MEME ARTESANAL': { from: 'teal', to: 'lime' },
  DIAMANTE: { from: '#1c95b1', to: '#16758b' },
  RANA: { from: 'teal', to: 'lime' },
  ORO: { from: 'yellow', to: 'yellow' },
  'SIN SONIDO': { from: 'gray', to: 'gray' },
  'NO SÉ YO': { from: 'red', to: 'red' },
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

const uniqueCategoryBackground: Record<UniqueCategoriesKeys<typeof PostCategories>, string> = {
  DIAMANTE: postDiamante,
  RANA: postRana,
  ORO: postOro,
}

/**
 * Interesting possiblities:
 *  - broadcast polls for each post (just for broadcaster, id = broadcasterId)
 *
 */
export default function Post({ image, categories, title, footer, author }: ArticleCardFooterProps) {
  const { classes, theme } = useStyles()

  const cardBackground = image ? image : uniqueCategoryBackground[categories.find((c) => uniqueCategoryBackground[c])]
  console.log(cardBackground)

  return (
    <Card
      p="lg"
      radius={12}
      className={classes.card}
      css={css`
        background-repeat: no-repeat;
        background-size: 300px; // must adapt to height, or ensure all posts have the same height
        background-position: right;
        -webkit-background-clip: padding-box;
        background-clip: padding-box;
        background-image: url(${cardBackground});
      `}
    >
      {categories.length > 0 && (
        <Group position="left">
          {categories.map((category, i) => (
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
              `}
            >
              <div
                css={css`
                  display: flex;
                  justify-content: center;
                  *:not(:first-child) {
                    margin-left: 3px;
                  }
                `}
              >
                {categoryEmojis[category] && <img src={categoryEmojis[category]} height={16} width={16} />}
                <div>{PostCategories[category] ?? category}</div>
                {categoryEmojis[category] && <img src={categoryEmojis[category]} height={16} width={16} />}
              </div>
            </Badge>
          ))}
        </Group>
      )}

      <Text weight={700} className={classes.title} mt="xs">
        {title}
      </Text>

      <Group mt="lg">
        <Avatar src={author.image} radius="sm" />
        <div>
          <Text weight={500}>{author.name}</Text>
          <Text size="xs" color="dimmed">
            {author.description}
          </Text>
        </div>
      </Group>

      <Card.Section className={classes.footer}>
        <Group position="apart">
          <Text size="xs" color="dimmed">
            {footer}
          </Text>
          <Group spacing={5}>
            <ActionIcon className={classes.action}>
              <IconHeart size={18} color={theme.colors.red[6]} stroke={1.5} />
            </ActionIcon>
            <ActionIcon className={classes.action}>
              <IconBookmark size={18} color={theme.colors.yellow[6]} stroke={1.5} />
            </ActionIcon>
            <ActionIcon className={classes.action}>
              <IconShare size={16} color={theme.colors.blue[6]} stroke={1.5} />
            </ActionIcon>
          </Group>
        </Group>
      </Card.Section>
    </Card>
  )
}
