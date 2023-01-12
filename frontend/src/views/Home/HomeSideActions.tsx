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
  MultiSelect,
  Popover,
  Select,
  Space,
  Text,
  TextInput,
  Textarea,
  Tooltip,
  createStyles,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import {
  IconBookmark,
  IconCross,
  IconCrossOff,
  IconEyeCheck,
  IconFilterOff,
  IconHeart,
  IconSearch,
  IconSend,
} from '@tabler/icons'
import type { PostCategory } from 'database'
import { remove, truncate } from 'lodash-es'
import { HTMLProps, useCallback, useEffect, useRef, useState } from 'react'
import CategoryBadge, { categoryEmojis, uniqueCategories } from 'src/components/CategoryBadge'
import ErrorCallout from 'src/components/ErrorCallout/ErrorCallout'
import ProtectedComponent from 'src/components/ProtectedComponent'
import useAuthenticatedUser from 'src/hooks/auth/useAuthenticatedUser'
import useUndo from 'src/hooks/useUndoRedo'
import { usePostCreateMutation, usePosts } from 'src/queries/api/posts'
import { emotesTextToHtml, htmlToEmotesText, anyKnownEmoteRe } from 'src/services/twitch'
import { usePostsSlice } from 'src/slices/posts'
import { useUISlice } from 'src/slices/ui'
import { getCaretCoordinates, getCaretIndex, pasteHtmlAtCaret } from 'src/utils/input'
import { sanitizeContentEditableInput, sanitizeContentEditableInputBeforeSubmit } from 'src/utils/string'
import { isURL } from 'src/utils/url'
import { PostCreateRequest, PostCategoryNames } from 'types'

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
  },

  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    width: '25vw',
    [theme.fn.smallerThan(1200)]: {
      width: '100%',
      maxWidth: '100vw',
      background: 'none',
    },
    [theme.fn.smallerThan(600)]: {
      width: '100vw',
      background: 'none',
    },
  },

  section: {
    borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
    // ':first-child': {
    //   paddingTop: theme.spacing.md,
    // },

    '#post-search-box': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
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

  sideLabel: {
    textTransform: 'uppercase',
    fontSize: theme.fontSizes.xs,
    fontWeight: 400,
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
  const postCreateMutation = usePostCreateMutation()
  const [titlePreviewPopoverOpened, setTitlePreviewPopoverOpened] = useState(false)
  const { addCategoryFilter, removeCategoryFilter, getPostsQueryParams, setGetPostsQueryParams } = usePostsSlice()
  const { burgerOpened, setBurgerOpened } = useUISlice()
  const usePostsQuery = usePosts()

  const [newPostModalOpened, setNewPostModalOpened] = useState(false)
  const { classes, theme } = useStyles()
  const emoteTooltipRef = useRef(null)
  const titleInputRef = useRef<HTMLInputElement>(null)
  const [typedEmote, setTypedEmote] = useState('')
  const [awaitEmoteCompletion, setAwaitEmoteCompletion] = useState(false)
  const [calloutErrors, setCalloutErrors] = useState([])
  const { isAuthenticated } = useAuthenticatedUser()

  const postCreateForm = useForm<PostCreateRequest>({
    initialValues: {
      ...storedNewPostForm,
    },

    validate: {
      title: (value) =>
        !value || value.trim() === '' || value.trim() === '<br>'
          ? 'Title cannot be empty'
          : value?.length > 250
          ? 'Title can have at most 250 characters.'
          : null,
      link: (value) =>
        !isURL(value)
          ? 'Link is not a valid URL'
          : value?.length > 250
          ? 'Link can have at most 250 characters.'
          : null,
      content: (value) => (value?.length > 400 ? 'Message can have at most 400 characters.' : null),
    },
  })

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
    localStorage.setItem(NEW_POST_FORM_KEY, JSON.stringify(postCreateForm.values))
  }, [postCreateForm.values])

  const handleSubmit = postCreateForm.onSubmit((values) => {
    values.title = sanitizeContentEditableInputBeforeSubmit(values.title)
    postCreateMutation.mutate(values, {
      onError(error, variables, context) {
        // TODO helper extractErrorMessage that fallbacks to internal error
        setCalloutErrors(['Internal server error'])
      },
      onSuccess(error, variables, context) {
        setNewPostModalOpened(false)
        setBurgerOpened(false)
        showNotification({
          id: 'post-created',
          title: 'Post submitted',
          message: 'New post created successfully',
          color: 'green',
          icon: <IconSend size={18} />,
          autoClose: 5000,
        })
      },
    })
  })

  function renderActiveCategoryFilters() {
    return getPostsQueryParams.categories?.map((category, i) => (
      <CategoryBadge
        className="disable-select"
        key={i}
        category={category}
        onClick={(e) => {
          removeCategoryFilter(category)
        }}
        css={css`
          :hover {
            transform: scale(1.03);
            transition-duration: 0.3s;
          }
        `}
      />
    ))
  }

  function renderCategoryFilters() {
    return Object.keys(PostCategoryNames)
      .filter((c: PostCategory) => {
        if (!getPostsQueryParams.categories) return true
        return !getPostsQueryParams.categories.includes(c)
      })
      .map((category: PostCategory, i) => {
        return (
          <CategoryBadge
            className="disable-select"
            key={i}
            onClick={(e) => {
              addCategoryFilter(category)
            }}
            css={css`
              filter: grayscale(0.8);

              :hover {
                filter: none;
                transform: scale(1.03);
                transition-duration: 0.3s;
              }
            `}
            category={category}
          />
        )
      })
  }

  // TODO reusable form
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
        <ErrorCallout title="Error uploading post" errors={calloutErrors} />
        <form onSubmit={handleSubmit}>
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
              <Textarea
                {...postCreateForm.getInputProps('title')}
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
                autosize
                minRows={2}
              />
            </Popover.Target>
            <Popover.Dropdown>
              <div
                ref={titleInputRef}
                dangerouslySetInnerHTML={{
                  __html: emotesTextToHtml(postCreateForm.values['title'], EMOJI_SIZE),
                }}
              ></div>
            </Popover.Dropdown>
          </Popover>
          <TextInput withAsterisk label="Link" {...postCreateForm.getInputProps('link')} />
          <TextInput label="Content" {...postCreateForm.getInputProps('content')} />
          <Text size={'xs'} opacity={'60%'}>
            Leave message empty to show link by default.
          </Text>
          <Group position="right" mt="md">
            <Button
              variant="gradient"
              gradient={{ from: '#1864ab', to: '#497baa', deg: 225 }}
              type="submit"
              loading={postCreateMutation.isLoading}
            >
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
          <Card.Section className={classes.section}>
            <TextInput
              id="post-search-box"
              placeholder="Search"
              icon={<IconSearch size={12} stroke={1.5} />}
              rightSectionWidth={70}
              styles={{ rightSection: { pointerEvents: 'none' } }}
              mb="sm"
              mt="md"
            />
          </Card.Section>
          <ProtectedComponent requiredRole="MODERATOR">
            <Menu>
              <Card.Section className={classes.section}>
                <Text mt="md" className={classes.label} color="dimmed">
                  Moderation filters
                </Text>
                <Flex mih={50} gap="md" justify="space-between" align="center" direction="row" wrap={'wrap'}>
                  <Text className={classes.sideLabel} color="dimmed">
                    Status
                  </Text>
                  <Select
                    data={[
                      { value: undefined, label: 'All' },
                      { value: 'true', label: 'Moderated' },
                      { value: 'false', label: 'Not moderated' },
                    ]}
                    onChange={(value: string) => {
                      const moderated = value ? value === 'true' : undefined
                      console.log(moderated)
                      setGetPostsQueryParams({ ...getPostsQueryParams, moderated })
                    }}
                    placeholder="Select posts to show"
                    defaultValue={'true'}
                  />
                </Flex>
              </Card.Section>
            </Menu>
          </ProtectedComponent>
          {isAuthenticated && (
            <Menu>
              <Card.Section className={classes.section}>
                <Text mt="md" className={classes.label} color="dimmed">
                  Personal filters
                </Text>
                <Flex mih={50} gap="md" justify="center" align="center" direction="row" wrap={'wrap'}>
                  <Chip
                    defaultChecked
                    variant="filled"
                    color="green"
                    checked={getPostsQueryParams.liked}
                    onClick={() =>
                      setGetPostsQueryParams({ ...getPostsQueryParams, liked: !getPostsQueryParams.liked })
                    }
                  >
                    Liked posts
                  </Chip>
                  <Chip
                    defaultChecked
                    variant="filled"
                    color="green"
                    checked={getPostsQueryParams.saved}
                    onClick={() =>
                      setGetPostsQueryParams({ ...getPostsQueryParams, saved: !getPostsQueryParams.saved })
                    }
                  >
                    Saved posts
                  </Chip>
                </Flex>
              </Card.Section>
            </Menu>
          )}

          <Card.Section className={classes.section}>
            <Text mt="md" className={classes.label} color="dimmed">
              Active category filters
            </Text>
            <Group spacing={7} mt={5}>
              {renderActiveCategoryFilters()}
            </Group>
          </Card.Section>
          <Card.Section className={classes.section}>
            <Text mt="md" className={classes.label} color="dimmed">
              Filter by category
            </Text>
            <Group spacing={7} mt={5}>
              {renderCategoryFilters()}
            </Group>
          </Card.Section>

          {isAuthenticated && (
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
          )}
        </Card>
      </Group>
    </div>
  )
}
