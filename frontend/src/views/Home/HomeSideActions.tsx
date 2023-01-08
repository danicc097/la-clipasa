import { css } from '@emotion/react'
import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Chip,
  Flex,
  Group,
  Input,
  MediaQuery,
  MediaQueryProps,
  Menu,
  Modal,
  Popover,
  Space,
  Text,
  TextInput,
  Textarea,
  Tooltip,
  createStyles,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconBookmark, IconCross, IconCrossOff, IconEyeCheck, IconFilterOff, IconHeart, IconSend } from '@tabler/icons'
import type { PostCategory } from 'database'
import { truncate } from 'lodash-es'
import { HTMLProps, useEffect, useRef, useState } from 'react'
import CategoryBadges, { categoryEmojis, uniqueCategories } from 'src/components/CategoryBadges'
import useUndo from 'src/hooks/useUndoRedo'
import { emotesTextToHtml, htmlToEmotesText, anyKnownEmoteRe } from 'src/services/twitch'
import { useUISlice } from 'src/slices/ui'
import { getCaretCoordinates, getCaretIndex, pasteHtmlAtCaret } from 'src/utils/input'
import { sanitizeContentEditableInput, sanitizeContentEditableInputBeforeSubmit } from 'src/utils/string'
import { isURL } from 'src/utils/url'
import { NewPostRequest, PostCategoryNames } from 'types'

const tooltipWithPx = 40

const useStyles = createStyles((theme) => ({
  tooltip: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: `${tooltipWithPx}px`,
    display: 'none',
    zIndex: 99999999999, // change to 10 if not used in modal
    background: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[4],
    color: theme.colorScheme === 'light' ? theme.colors.dark[4] : theme.colors.gray[4],
    borderRadius: '0.25rem',
    padding: '0.4rem',
    fontSize: '0.8rem',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 700,

    '::after': {
      content: '" "',
      position: 'absolute',
      top: '100%',
      left: '50%',
      marginLeft: '-5px',
      borderWidth: '5px',
      borderStyle: 'solid',
      borderColor: `${
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[4]
      } transparent transparent transparent`,
    },
  },

  sideActions: {
    alignSelf: 'flex-start',
    marginTop: '1rem',
    // need to use https://mantine.dev/core/media-query/ instead,
    //  cannot share the same style logic for all instances
    // [theme.fn.smallerThan('xl')]: {
    //   minWidth: '100%',
    //   display: 'none',
    // },
  },

  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    maxWidth: '20vw',
    [theme.fn.smallerThan(1200)]: {
      maxWidth: '100vw',
      minWidth: '60vw',
      background: 'none',
    },
  },

  section: {
    borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    // ':first-child': {
    //   paddingTop: theme.spacing.md,
    // },
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

const EMOJI_SIZE = 24

const NEW_POST_FORM_KEY = 'newPostForm'
let storedNewPostForm: any = {}
try {
  storedNewPostForm = JSON.parse(localStorage.getItem(NEW_POST_FORM_KEY)) ?? {}
} catch (error) {
  console.log(error)
}

type HomeSideActionsProps = HTMLProps<HTMLDivElement>

export default function HomeSideActions(props: HomeSideActionsProps) {
  const { ...htmlProps } = props

  const [titlePreviewPopoverOpened, setTitlePreviewPopoverOpened] = useState(false)

  const [newPostModalOpened, setNewPostModalOpened] = useState(false)
  const { classes, theme } = useStyles()
  /**
   * contains a cleaner innerHTML than contentEditableRef
   */
  const emoteTooltipRef = useRef(null)
  const titleInputRef = useRef<HTMLInputElement>(null)
  const [typedEmote, setTypedEmote] = useState('')
  const [awaitEmoteCompletion, setAwaitEmoteCompletion] = useState(false)
  const [filterLiked, setFilterLiked] = useState(false)
  const [filterSaved, setFilterSaved] = useState(false)

  const form = useForm<NewPostRequest>({
    initialValues: {
      ...storedNewPostForm,
    },

    validate: {
      title: (value) =>
        !value || value.trim() === '' || value.trim() === '<br>'
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

  const filterBg = theme.colorScheme === 'light' ? theme.colors.violet[5] : theme.colors.violet[4]

  useEffect(() => {
    if (awaitEmoteCompletion) {
      const { x, y } = getCaretCoordinates()
      console.log(x)
      console.log(y)
      emoteTooltipRef.current.setAttribute('aria-hidden', 'false')
      emoteTooltipRef.current.setAttribute(
        'style',
        `display: inline-block; left: ${x - tooltipWithPx / 2}px; top: ${y - 36}px`,
      )
    } else {
      emoteTooltipRef.current.setAttribute('aria-hidden', 'true')
      emoteTooltipRef.current.setAttribute('style', 'display: none;')
    }
  }, [awaitEmoteCompletion])

  useEffect(() => {
    localStorage.setItem(NEW_POST_FORM_KEY, JSON.stringify(form.values))
  }, [form.values])

  const renderNewPostModal = () => (
    <>
      <Modal
        opened={newPostModalOpened}
        onClose={() => {
          setNewPostModalOpened(false)
          setAwaitEmoteCompletion(false)
        }}
        title="Create a new post"
        zIndex={20000}
        // size="60%"
        closeOnEscape={false} // user may press escape to enter emote
      >
        <form
          onSubmit={form.onSubmit((values) => {
            values.title = sanitizeContentEditableInputBeforeSubmit(values.title)
            console.log(values)
          })}
        >
          {/* {caretPosition} */}
          {/*
          TODO give up on this, not worth it
          - Use regular input and tooltip is shown when endswith emote
          - Emote input on mobile will surely be broken if using contenteditable the way it is now
          - have an "eye" icon to show preview message on a popover and set its innerhtml there,
          that will be enough.
 */}
          <Popover
            opened={titlePreviewPopoverOpened}
            styles={{
              dropdown: {
                maxWidth: '30vw',
                textAlign: 'center',
                verticalAlign: 'middle',
                display: 'block',
                wordWrap: 'break-word',

                [theme.fn.smallerThan('xs')]: {
                  display: 'none',
                },
              },
            }}
            position="right-start"
            withArrow
            shadow="md"
          >
            <Popover.Target>
              <TextInput
                {...form.getInputProps('title')}
                ref={titleInputRef}
                withAsterisk
                label="Title"
                placeholder="Enter a title"
                onClick={() => setTitlePreviewPopoverOpened(true)}
                onFocus={() => setTitlePreviewPopoverOpened(true)}
                onBlur={() => setTitlePreviewPopoverOpened(false)}
                rightSection={
                  <Tooltip label="Preview">
                    <Group>
                      <IconEyeCheck
                        color="#4077aa"
                        size={20}
                        css={css`
                          cursor: pointer;
                          :hover {
                            filter: brightness(2);
                          }
                        `}
                        onClick={() => setTitlePreviewPopoverOpened(!titlePreviewPopoverOpened)}
                      />
                    </Group>
                  </Tooltip>
                }
              />
            </Popover.Target>
            <Popover.Dropdown>
              <div
                ref={titleInputRef}
                dangerouslySetInnerHTML={{
                  __html: emotesTextToHtml(form.values['title'], EMOJI_SIZE),
                }}
              ></div>
            </Popover.Dropdown>
          </Popover>
          <TextInput withAsterisk label="Link" {...form.getInputProps('link')} />
          <TextInput label="Content" {...form.getInputProps('content')} />
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
    <div {...(htmlProps as any)}>
      {renderNewPostModal()}
      <span
        className={classes.tooltip}
        ref={emoteTooltipRef}
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: emotesTextToHtml(typedEmote, EMOJI_SIZE) }}
      ></span>
      <Group className={classes.sideActions}>
        <Card radius="md" p="md" className={classes.card}>
          {/* <Card.Section className={classes.section} mt="md">
            <Group position="apart">
              <Text size="lg" weight={500}>
                {'Title'}
              </Text>
            </Group>
            <Text size="sm" mt="xs">
              {'description'}
            </Text>
          </Card.Section> */}

          <Menu>
            <Card.Section className={classes.section}>
              <Text className={classes.label} color="dimmed">
                Personal filters
              </Text>
              <Space pb={10} />
              <Flex mih={50} gap="md" justify="flex-start" align="center" direction="column">
                <Chip defaultChecked>Liked posts</Chip>
                <Chip defaultChecked>Saved posts</Chip>
                <Button
                  fullWidth
                  opacity={!filterLiked && '90%'}
                  bg={!filterLiked ? theme.colors.gray[6] : filterBg}
                  leftIcon={
                    !filterLiked && (
                      <IconHeart fill={theme.colors.red[6]} size={20} color={theme.colors.red[6]} stroke={1.5} />
                    )
                  }
                  rightIcon={filterLiked && <IconFilterOff fill={'white'} size={20} color={'white'} stroke={1.5} />}
                  onClick={() => setFilterLiked(!filterLiked)}
                >
                  <Text>Liked posts</Text>
                </Button>
                <Button
                  fullWidth
                  opacity={!filterSaved && '90%'}
                  bg={!filterSaved ? theme.colors.gray[6] : filterBg}
                  leftIcon={
                    !filterSaved && (
                      <IconBookmark
                        fill={theme.colors.yellow[6]}
                        size={20}
                        color={theme.colors.yellow[6]}
                        stroke={1.5}
                      />
                    )
                  }
                  rightIcon={filterSaved && <IconFilterOff fill={'white'} size={20} color={'white'} stroke={1.5} />}
                  onClick={() => setFilterSaved(!filterSaved)}
                >
                  <Text>Saved posts</Text>
                </Button>
              </Flex>
            </Card.Section>
          </Menu>

          <Card.Section className={classes.section}>
            <Text mt="md" className={classes.label} color="dimmed">
              Filter by category
            </Text>
            <Group spacing={7} mt={5}>
              <CategoryBadges categories={Object.keys(PostCategoryNames) as PostCategory[]} />
            </Group>
          </Card.Section>

          <Group mt="xs">
            <Button
              leftIcon={<IconSend size={20} stroke={1.5} />}
              radius="md"
              style={{ flex: 1 }}
              onClick={() => setNewPostModalOpened(true)}
            >
              Submit post
            </Button>
            {/* <ActionIcon variant="default" radius="md" size={36}>
              <IconHeart size={18} className={classes.like} stroke={1.5} />
            </ActionIcon> */}
          </Group>
        </Card>
      </Group>
    </div>
  )
}
