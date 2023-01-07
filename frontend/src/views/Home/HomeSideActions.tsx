import { css } from '@emotion/react'
import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Group,
  Input,
  Modal,
  Popover,
  Text,
  TextInput,
  Textarea,
  Tooltip,
  createStyles,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconHeart } from '@tabler/icons'
import type { PostCategory } from 'database'
import { truncate } from 'lodash-es'
import { useEffect, useRef, useState } from 'react'
import CategoryBadges, { uniqueCategories } from 'src/components/CategoryBadges'
import { emotesTextToHtml, htmlToEmotesText } from 'src/services/twitch'
import { isURL } from 'src/utils/url'
import type { NewPostRequest, PostCategoryNames } from 'types'

const useStyles = createStyles((theme) => ({
  sideActions: {
    alignSelf: 'flex-start',
    marginTop: '1rem',
    // [theme.fn.smallerThan('xl')]: {
    //   // TODO burger menu on Header left
    //   display: 'none',
    // },
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

const EMOJI_SIZE = 28

export default function HomeSideActions({ title, description, country, badges }: BadgeCardProps) {
  const [newPostModalOpened, setNewPostModalOpened] = useState(false)
  const { classes, theme } = useStyles()
  const inputRef = useRef(null)
  const titleInputRef = useRef(null)
  const [titleInput, setTitleInput] = useState('some text before calieAMOR2 and after')
  const [cursorPosition, setCursorPosition] = useState(0)

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
          <div>
            <Input
              ref={inputRef}
              component="div"
              contentEditable
              withAsterisk
              label="Title"
              placeholder="Enter a title"
              {...form.getInputProps('title')}
              onInput={(e) => {
                const selectionStart = e.currentTarget.selectionStart
                const selectionEnd = e.currentTarget.selectionEnd
                console.log(titleInputRef.current.innerHTML)
                console.log(htmlToEmotesText(titleInputRef.current.innerHTML))
                setTitleInput(htmlToEmotesText(titleInputRef.current.innerHTML))
                // TODO remember cursor position when replacing inner html
                e.currentTarget.selectionStart = selectionStart
                e.currentTarget.selectionEnd = selectionEnd
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || (e.key === 'Shift' && e.code === 'Enter')) {
                  e.preventDefault()
                }
              }}
            >
              <div
                css={css`
                  width: 100%;
                  white-space: nowrap;
                  overflow: hidden;
                `}
                ref={titleInputRef}
                // TODO replacing on every text input, unless it's inside <img(.*)> else infinite recursion
                dangerouslySetInnerHTML={{
                  __html: emotesTextToHtml(titleInput, EMOJI_SIZE),
                }}
              ></div>
            </Input>
          </div>

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
