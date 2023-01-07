import { ActionIcon, Badge, Button, Card, Group, Modal, Text, TextInput, createStyles } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconHeart } from '@tabler/icons'
import type { PostCategory } from 'database'
import { useState } from 'react'
import CategoryBadges, { uniqueCategories } from 'src/components/CategoryBadges'
import { isURL } from 'src/utils/url'
import { NewPostRequest, PostCategoryNames } from 'types'

const useStyles = createStyles((theme) => ({
  sideActions: {
    alignSelf: 'flex-start',
    marginTop: '1rem',
    [theme.fn.smallerThan('xl')]: {
      // TODO burger menu on Header left
      display: 'none',
    },
  },

  card: {
    maxWidth: '15vw',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  section: {
    borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    ':first-child': {
      paddingTop: theme.spacing.md,
    },
  },

  like: {
    color: theme.colors.red[6],
  },

  label: {
    textTransform: 'uppercase',
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}))

interface BadgeCardProps {
  title: string
  country: string
  description: string
  badges: {
    emoji: string
    label: string
  }[]
}

export default function HomeSideActions({ title, description, country, badges }: BadgeCardProps) {
  const [newPostModalOpened, setNewPostModalOpened] = useState(false)
  const { classes, theme } = useStyles()

  const features = badges.map((badge) => (
    <Badge color={theme.colorScheme === 'dark' ? 'dark' : 'gray'} key={badge.label} leftSection={badge.emoji}>
      {badge.label}
    </Badge>
  ))

  const form = useForm<NewPostRequest>({
    initialValues: {
      content: null,
      link: null,
      title: null,
    },

    validate: {
      title: (value) =>
        value === null || value === ''
          ? 'Title cannot be empty'
          : value?.length > 200
          ? 'Title can have at most 200 characters.'
          : null,
      link: (value) =>
        !isURL(value)
          ? 'Link is not a valid URL'
          : value?.length > 200
          ? 'Link can have at most 200 characters.'
          : null,
      content: (value) => (value?.length > 300 ? 'Message can have at most 300 characters.' : null),
    },
  })

  const renderNewPostModal = () => (
    <>
      <Modal
        opened={newPostModalOpened}
        onClose={() => setNewPostModalOpened(false)}
        title="Create a new post"
        zIndex={20000}
      >
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <TextInput withAsterisk label="Title" placeholder="Enter a title" {...form.getInputProps('title')} />
          <TextInput withAsterisk label="Link" placeholder="Enter a link" {...form.getInputProps('link')} />
          <TextInput label="Content" placeholder="Enter a message" {...form.getInputProps('content')} />
          <Text size={'xs'} opacity={'60%'}>
            Leave message empty to show link by default.
          </Text>

          <Group position="right" mt="md">
            <Button variant="gradient" gradient={{ from: '#1864ab', to: '#497baa', deg: 225 }} type="submit">
              Submit
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  )

  return (
    <>
      {renderNewPostModal()}

      <Group className={classes.sideActions}>
        <Card radius="md" p="md" className={classes.card}>
          <Card.Section className={classes.section} mt="md">
            <Group position="apart">
              <Text size="lg" weight={500}>
                {title}
              </Text>
              <Badge size="sm">{country}</Badge>
            </Group>
            <Text size="sm" mt="xs">
              {description}
            </Text>
          </Card.Section>

          <Card.Section className={classes.section}>
            <Text mt="md" className={classes.label} color="dimmed">
              Filter by category
            </Text>
            <Group spacing={7} mt={5}>
              <CategoryBadges categories={Object.keys(uniqueCategories) as PostCategory[]} />
            </Group>
          </Card.Section>

          <Group mt="xs">
            <Button radius="md" style={{ flex: 1 }} onClick={() => setNewPostModalOpened(true)}>
              Submit post
            </Button>
            {/* <ActionIcon variant="default" radius="md" size={36}>
              <IconHeart size={18} className={classes.like} stroke={1.5} />
            </ActionIcon> */}
          </Group>
        </Card>
      </Group>
    </>
  )
}
