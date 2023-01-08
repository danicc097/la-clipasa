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
import CategoryBadges, { categoryEmojis, uniqueCategories } from 'src/components/CategoryBadges'
import { emotesTextToHtml, htmlToEmotesText, anyKnownEmoteRe } from 'src/services/twitch'
import { getCaretCoordinates, getCaretIndex } from 'src/utils/input'
import { sanitizeContentEditableInput } from 'src/utils/string'
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
    zIndex: 10,
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

const EMOJI_SIZE = 24

function toggleTooltip(event, contenteditable) {
  const tooltip = document.getElementById('tooltip')
  if (contenteditable.contains(event.target)) {
    const { x, y } = getCaretCoordinates()
    tooltip.setAttribute('aria-hidden', 'false')
    tooltip.setAttribute('style', `display: inline-block; left: ${x - tooltipWithPx / 2}px; top: ${y - 36}px`)
  } else {
    tooltip.setAttribute('aria-hidden', 'true')
    tooltip.setAttribute('style', 'display: none;')
  }
}

export default function HomeSideActions({ title, description, country, badges }: BadgeCardProps) {
  const [newPostModalOpened, setNewPostModalOpened] = useState(false)
  const { classes, theme } = useStyles()
  const contentEditableRef = useRef(null)
  /**
   * contains a cleaner innerHTML than contentEditableRef
   */
  const titleInputRef = useRef(null)
  const [titleInput, setTitleInput] = useState('<br>')
  const [typedEmote, setTypedEmote] = useState('calieAMOR2')
  const [caretPosition, setCaretPosition] = useState(0)
  const titleInputChildCount = useRef(0)

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

  //
  function setCaretInNodeChildren(el, pos) {
    // Loop through all child nodes, substracting child node length if  (if its text type 3, other elements
    // do not count towards caret pos)
    for (const node of el.childNodes) {
      if (node.nodeType == 3) {
        // inside a text node
        if (node.length >= pos) {
          const range = document.createRange(),
            sel = window.getSelection()
          range.setStart(node, pos)
          range.collapse(true)
          sel.removeAllRanges()
          sel.addRange(range)
          return -1 // we are done
        } else {
          pos -= node.length // pos given is absolute account for all text children
        }
      } else {
        pos = setCaretInNodeChildren(node, pos)
        if (pos == -1) {
          return -1 // no need to finish the for loop
        }
      }
    }
    return pos // needed because of recursion stuff
  }

  useEffect(() => {
    try {
      if (!titleInputRef.current) return

      const pos = caretPosition
      console.log('titleInputRef.current')
      console.log(titleInputRef.current)

      setCaretInNodeChildren(titleInputRef.current, pos)
    } catch (error: any) {
      console.log('failed to set cursor position: ', error)
    }
  }, [titleInput])

  // havent tried this yet but wont work as is most likely
  // function replaceCaret(el: HTMLElement) {
  //   // Place the caret at the end of the element
  //   const target = document.createTextNode('')
  //   el.appendChild(target)
  //   // do not move caret if element was not focused
  //   const isTargetFocused = document.activeElement === el
  //   if (target !== null && target.nodeValue !== null && isTargetFocused) {
  //     const sel = window.getSelection()
  //     if (sel !== null) {
  //       const range = document.createRange()
  //       range.setStart(target, target.nodeValue.length)
  //       range.collapse(true)
  //       sel.removeAllRanges()
  //       sel.addRange(range)
  //     }
  //     if (el instanceof HTMLElement) el.focus()
  //   }
  // }

  const renderNewPostModal = () => (
    <>
      {/* <Modal
        opened={newPostModalOpened}
        onClose={() => setNewPostModalOpened(false)}
        title="Create a new post"
        zIndex={20000}
      > */}
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        {caretPosition}
        <div>
          <Input
            ref={contentEditableRef}
            component="div"
            suppressContentEditableWarning
            contentEditable
            withAsterisk
            label="Title"
            placeholder="Enter a title"
            {...form.getInputProps('title')}
            css={css`
              text-align: center;
              vertical-align: middle;
              display: block;
            `}
            onPaste={(e) => {
              e.preventDefault()
              const data = e.clipboardData.getData('text/plain')
              const sanitizedData = sanitizeContentEditableInput(data)
              setTitleInput(sanitizedData)
            }}
            onInput={(e) => {
              // for both (1) cursor positioning after setTitleInput is called
              // and (2) having tooltip showing current emote:
              // if endswith is a valid emote, do not replace it directly after typing,
              // show tooltip instead and return early, setting state "awaitEmoteCompletion" to true without replacing.
              // theres a listener on keypress, if awaitEmoteCompletion && key is tab -> setTitleInput(htmlToEmotesText(titleInputRef.current.innerHTML))
              // called from listener handler
              const caretPosition = getCaretIndex(titleInputRef.current)
              const currentText = htmlToEmotesText(titleInputRef.current.innerHTML)
              const endsWithEmote = currentText.match(new RegExp(`(${anyKnownEmoteRe})$`, 'gi'))?.length > 0

              const titleInputChildrenCount = titleInputRef.current.childNodes.length
              console.log('titleInputChildrenCount: ', titleInputChildrenCount)
              titleInputChildCount.current = titleInputChildrenCount

              if (endsWithEmote) {
                console.log('endswith emote, should exit early and wait for tab')
              }
              // TODO remove newlines in case of copypasting (and general sanitizing)
              setTitleInput(currentText)
              setCaretPosition(caretPosition)
              // TODO remember cursor position when replacing inner html
            }}
            onChange={(e) => {
              const caretPosition = getCaretIndex(contentEditableRef.current)
              setCaretPosition(caretPosition)
            }}
            onClick={(e) => {
              toggleTooltip(e, titleInputRef.current)
              const caretPosition = getCaretIndex(contentEditableRef.current)
              console.log(caretPosition)
              setCaretPosition(caretPosition)
            }}
            onKeyUp={(e) => {
              toggleTooltip(e, titleInputRef.current)
              const caretPosition = getCaretIndex(contentEditableRef.current)
              if (caretPosition === 0) return
              setCaretPosition(caretPosition)
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
      {/* </Modal> */}
    </>
  )

  return (
    <>
      {/* TODO reenable when caret working {renderNewPostModal()} */}

      <span
        className={classes.tooltip}
        id="tooltip"
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: emotesTextToHtml(typedEmote, EMOJI_SIZE) }}
      ></span>
      <Group className={classes.sideActions}>
        <Card radius="md" p="md" className={classes.card}>
          {renderNewPostModal()}
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
              <CategoryBadges categories={Object.keys(PostCategoryNames) as PostCategory[]} />
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
