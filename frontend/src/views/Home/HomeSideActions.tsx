import { css } from '@emotion/react'
import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Flex,
  Group,
  Input,
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
import { IconBookmark, IconCross, IconCrossOff, IconFilterOff, IconHeart, IconSend } from '@tabler/icons'
import type { PostCategory } from 'database'
import { truncate } from 'lodash-es'
import { useEffect, useRef, useState } from 'react'
import CategoryBadges, { categoryEmojis, uniqueCategories } from 'src/components/CategoryBadges'
import useUndo from 'src/hooks/useUndoRedo'
import { emotesTextToHtml, htmlToEmotesText, anyKnownEmoteRe } from 'src/services/twitch'
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

  // TODO fix flex grow and show burger in < xs
  sideActions: {
    alignSelf: 'flex-start',
    marginTop: '1rem',
    [theme.fn.smallerThan('xl')]: {
      // TODO burger menu on Header left
      minWidth: '100%',
      // display: 'none',
    },
  },

  card: {
    maxWidth: '25vw',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
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

const NEW_POST_FORM_KEY = 'newPostForm'
let storedNewPostForm: any = {}
try {
  storedNewPostForm = JSON.parse(localStorage.getItem(NEW_POST_FORM_KEY)) ?? {}
} catch (error) {
  console.log(error)
}

export default function HomeSideActions() {
  const [newPostModalOpened, setNewPostModalOpened] = useState(true)
  const { classes, theme } = useStyles()
  const contentEditableRef = useRef(null)
  /**
   * contains a cleaner innerHTML than contentEditableRef
   */
  const titleInputRef = useRef<HTMLInputElement>(null)
  const initialTitleInput = '<br>'
  const [titleInput, setTitleInput] = useState(htmlToEmotesText(storedNewPostForm?.title ?? initialTitleInput))
  const [typedEmote, setTypedEmote] = useState('')
  const [caretPosition, setCaretPosition] = useState(0)
  const [awaitEmoteCompletion, setAwaitEmoteCompletion] = useState(false)
  const [pastedTitle, setPastedTitle] = useState(false)
  const [insertSpaceAfterEmote, setInsertSpaceAfterEmote] = useState(false)
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

  // const { redo, undo, value } = useUndo(titleInput)

  // TODO get rid of this
  const titleInputHistory = useRef<string[]>([])
  const titleInputHistoryStack = useRef<string[]>([])

  function saveTitleInputHistory() {
    titleInputHistory.current.push(titleInput)
  }

  function undoTitleInput() {
    if (titleInputHistory.current.length > 0) {
      const previousTitle = titleInputHistory.current.pop()
      titleInputHistoryStack.current.unshift(titleInput)
      setTitleInput(previousTitle)
    }
  }

  function redoTitleInput() {
    if (titleInputHistoryStack.current.length > 0) {
      const previousTitle = titleInputHistoryStack.current.shift()
      setTitleInput(previousTitle)
    }
  }

  useEffect(() => {
    const tooltip = document.getElementById('tooltip')
    if (awaitEmoteCompletion) {
      const { x, y } = getCaretCoordinates()
      tooltip.setAttribute('aria-hidden', 'false')
      tooltip.setAttribute('style', `display: inline-block; left: ${x - tooltipWithPx / 2}px; top: ${y - 36}px`)
    } else {
      tooltip.setAttribute('aria-hidden', 'true')
      tooltip.setAttribute('style', 'display: none;')
    }
  }, [awaitEmoteCompletion])

  useEffect(() => {
    function setCaretInNodeChildren(el, pos) {
      for (const node of el.childNodes) {
        if (node.nodeType == 3) {
          // inside a text node
          if (node.length >= pos) {
            const range = document.createRange()
            const sel = window.getSelection()
            range.setStart(node, pos)
            range.collapse(true)
            sel.removeAllRanges()
            sel.addRange(range)
            return -1 // we are done
          } else {
            pos = pos - node.length // pos given is absolute account for all text children
          }
        } else {
          pos = setCaretInNodeChildren(node, pos)
          if (pos == -1) {
            return -1 // no need to finish the for loop
          }
        }
      }

      return pos // continue searching
    }

    try {
      setCaretInNodeChildren(titleInputRef.current, caretPosition)
    } catch (error: any) {
      console.log('failed to set cursor position: ', error)
    }
  }, [titleInput, pastedTitle, caretPosition])

  useEffect(() => {
    console.log('caretPosition: ', caretPosition)
  }, [caretPosition])

  useEffect(() => {
    localStorage.setItem(NEW_POST_FORM_KEY, JSON.stringify(form.values))
  }, [form.values])

  // FIXME does nothing
  useEffect(() => {
    if (insertSpaceAfterEmote) {
      let evt = new KeyboardEvent('keypress', { key: 'ArrowRight' })
      let success = contentEditableRef.current.dispatchEvent(evt)
      console.log('keypress success: ', success)
      evt = new KeyboardEvent('keypress', { key: 'Spacebar' })
      success = contentEditableRef.current.dispatchEvent(evt)
      console.log('keypress success: ', success)
      setInsertSpaceAfterEmote(false)
    }
  }, [insertSpaceAfterEmote])

  function getRangeContents(range: Range): string {
    const clonedRange = range.cloneContents()

    const iterator = document.createNodeIterator(clonedRange, NodeFilter.SHOW_TEXT)

    let text = ''
    let currentNode
    while ((currentNode = iterator.nextNode())) {
      text += currentNode.textContent
    }

    return text
  }

  // not working atm
  function getStringUpToCursor(el, pos) {
    for (const node of el.childNodes) {
      if (node.nodeType == 3) {
        // inside a text node
        if (node.length >= pos) {
          const range = document.createRange()
          const sel = window.getSelection()
          range.setStart(node, pos)
          range.collapse(true)
          sel.removeAllRanges()
          sel.addRange(range)
          const content = getRangeContents(range)

          console.log('content: ', content)
          return -1 // we are done
        } else {
          pos = pos - node.length // pos given is absolute account for all text children
        }
      } else {
        pos = getStringUpToCursor(node, pos)
        if (pos == -1) {
          return -1 // no need to finish the for loop
        }
      }
    }

    return pos // continue searching
  }

  function renderRequiredAsterisk() {
    return (
      <span style={{ color: 'red' }} aria-hidden="true">
        {' '}
        *
      </span>
    )
  }

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
        size="60%"
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

          <TextInput
            ref={titleInputRef}
            disabled
            withAsterisk
            label="Title"
            placeholder="Enter a title"
            {...form.getInputProps('title')}
          /> */}
          <div>
            <Text size={'sm'}>
              Title
              {renderRequiredAsterisk()}
            </Text>
            <Input
              ref={contentEditableRef}
              component="div"
              suppressContentEditableWarning
              contentEditable
              label="Title"
              placeholder="Enter a title"
              {...form.getInputProps('title')}
              style={{
                // height: '100px',
                textAlign: 'center',
                verticalAlign: 'middle',
                display: 'block',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                wordWrap: 'break-word',
              }}
              styles={{
                input: {
                  ...(form.errors['title'] && { color: '#e03131', borderColor: '#e03131' }),
                },
              }}
              onPaste={(e) => {
                e.preventDefault()
                const data = e.clipboardData.getData('text/plain')
                pasteHtmlAtCaret(htmlToEmotesText(data))
                setPastedTitle(true)
              }}
              onInput={(e) => {
                if (pastedTitle) return
                let newCaretPos = getCaretIndex(titleInputRef.current)
                // getStringUpToCursor(titleInputRef.current, newCaretPos)
                // dont want a match once emote text is converted to img
                const emoteMatch = titleInputRef.current.innerHTML.match(new RegExp(`(${anyKnownEmoteRe})$`, 'gi'))
                const endsWithEmote = emoteMatch?.length > 0
                if (endsWithEmote) {
                  const emoteName = emoteMatch[0]
                  setTypedEmote(emoteName)
                  console.log(`endswith ${emoteName}, should exit early and wait for tab`)
                  setAwaitEmoteCompletion(true)
                  console.log(newCaretPos)
                  newCaretPos = newCaretPos - emoteMatch[0].length
                  console.log(newCaretPos)
                  setCaretPosition(newCaretPos)
                  return
                }
                if (!awaitEmoteCompletion) {
                  const title = htmlToEmotesText(titleInputRef.current.innerHTML)
                  setTitleInput(title)
                  form.setFieldValue('title', title)
                }
                setCaretPosition(newCaretPos)
                // TODO remember cursor position when replacing inner html
              }}
              // onChange={(e) => {
              //   const newCaretPos = getCaretIndex(titleInputRef.current)
              //   setCaretPosition(newCaretPos)
              // }}
              // onBlur={(e) => {
              //   if (pastedTitle) return
              //   setAwaitEmoteCompletion(false)
              //   const newCaretPos = getCaretIndex(titleInputRef.current)
              //   setCaretPosition(newCaretPos)
              // }}
              // onFocus={(e) => {
              //   if (pastedTitle) return
              //   setAwaitEmoteCompletion(false)
              //   const newCaretPos = getCaretIndex(titleInputRef.current)
              //   setCaretPosition(newCaretPos)
              // }}
              onClick={(e) => {
                if (pastedTitle) return
                setAwaitEmoteCompletion(false)
                const newCaretPos = getCaretIndex(titleInputRef.current)
                setCaretPosition(newCaretPos)
              }}
              onKeyUp={(e) => {
                if (pastedTitle) {
                  const title = htmlToEmotesText(titleInputRef.current.innerHTML)
                  setTitleInput(title)
                  form.setFieldValue('title', title)
                  setPastedTitle(false)
                  return
                }
                const newCaretPos = getCaretIndex(titleInputRef.current)
                setCaretPosition(newCaretPos)
              }}
              onKeyDown={(e) => {
                if (pastedTitle) return

                if (e.ctrlKey && e.key == 'z') {
                  undoTitleInput()
                  return
                }

                if (e.ctrlKey && e.key == 'y') {
                  redoTitleInput()
                  return
                }
                if (awaitEmoteCompletion) {
                  const validKey =
                    e.key === 'Spacebar' ||
                    e.key === ' ' ||
                    e.key === 'Tab' ||
                    e.key === 'Delete' ||
                    e.key === 'Enter' ||
                    e.key === 'Escape' ||
                    e.key === 'Backspace'

                  if (!validKey) {
                    e.preventDefault()
                    return
                  }

                  const title = htmlToEmotesText(titleInputRef.current.innerHTML)
                  setTitleInput(title)
                  form.setFieldValue('title', title)
                  setAwaitEmoteCompletion(false)
                  setInsertSpaceAfterEmote(true)
                  saveTitleInputHistory()
                }
                if (e.key === 'Enter' || e.key === 'Tab' || (e.key === 'Shift' && e.code === 'Enter')) {
                  e.preventDefault()
                }
              }}
            >
              <div
                ref={titleInputRef}
                dangerouslySetInnerHTML={{
                  __html: emotesTextToHtml(titleInput, EMOJI_SIZE),
                }}
              ></div>
            </Input>
            <Text size={'xs'} color="red">
              {form.errors['title']}
            </Text>
          </div>

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
    <>
      {renderNewPostModal()}
      <span
        className={classes.tooltip}
        id="tooltip"
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: emotesTextToHtml(typedEmote, EMOJI_SIZE) }}
      ></span>
      <Group className={classes.sideActions}>
        <Card radius="md" p="md" className={classes.card}>
          <Card.Section className={classes.section} mt="md">
            <Group position="apart">
              <Text size="lg" weight={500}>
                {'Title'}
              </Text>
            </Group>
            <Text size="sm" mt="xs">
              {'description'}
            </Text>
          </Card.Section>

          <Menu>
            <Card.Section className={classes.section} mt="md">
              <Text mt="md" className={classes.label} color="dimmed">
                Personal filters
              </Text>
              <Space pb={10} />
              <Flex mih={50} gap="md" justify="flex-start" align="center" direction="column">
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
    </>
  )
}
