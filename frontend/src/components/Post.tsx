import { createStyles, Card, Image, ActionIcon, Group, Text, Avatar, Badge, DefaultMantineColor } from '@mantine/core'
import { IconHeart, IconBookmark, IconShare } from '@tabler/icons'
import emojiRana from 'src/assets/emoji-rana.png'
import { css } from '@emotion/react'

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    minWidth: '80vw',
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  footer: {
    padding: `${theme.spacing.xs}px ${theme.spacing.lg}px`,
    marginTop: theme.spacing.md,
    borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
  },
}))

interface ArticleCardFooterProps {
  image: string
  categories: string[]
  title: string
  footer: JSX.Element
  author: {
    name: string
    description: string
    image: string
  }
}

type Categories = 'Rana' | 'Oro' | 'Diamante' | 'Meme artesanal'

const categoryEmojis: Record<Categories, string> = {
  'Meme artesanal': emojiRana,
  Diamante: emojiRana,
  Rana: emojiRana,
  Oro: emojiRana,
}

const categoryColor: Record<Categories, DefaultMantineColor> = {
  'Meme artesanal': 'green',
  Diamante: 'cyan',
  Rana: 'green',
  Oro: 'yellow',
}

export default function Post({ image, categories, title, footer, author }: ArticleCardFooterProps) {
  const { classes, theme } = useStyles()

  return (
    <Card withBorder p="lg" className={classes.card}>
      <Card.Section mb="sm">
        <Image src={image} alt={title} height={180} />
      </Card.Section>

      {categories.length > 0 && (
        <Group position="left">
          {categories.map((category, i) => (
            <Badge
              key={i}
              color="green"
              css={css`
                display: flex;
                justify-content: space-between;
                align-items: center;
              `}
            >
              {categoryEmojis[category] && <img src={categoryEmojis[category]} height={16} width={16} />}
              {category}
              {categoryEmojis[category] && <img src={categoryEmojis[category]} height={16} width={16} />}
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
          <Group spacing={0}>
            <ActionIcon>
              <IconHeart size={18} color={theme.colors.red[6]} stroke={1.5} />
            </ActionIcon>
            <ActionIcon>
              <IconBookmark size={18} color={theme.colors.yellow[6]} stroke={1.5} />
            </ActionIcon>
            <ActionIcon>
              <IconShare size={16} color={theme.colors.blue[6]} stroke={1.5} />
            </ActionIcon>
          </Group>
        </Group>
      </Card.Section>
    </Card>
  )
}
