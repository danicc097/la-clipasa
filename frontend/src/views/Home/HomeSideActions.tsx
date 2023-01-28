import { css } from '@emotion/react'
import {
  ActionIcon,
  Button,
  Card,
  Chip,
  Flex,
  Group,
  Loader,
  Menu,
  Modal,
  Popover,
  Select,
  Text,
  TextInput,
  Textarea,
  Tooltip,
  createStyles,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { IconEyeCheck, IconSearch, IconSend } from '@tabler/icons'
import { InfiniteData, useQueryClient } from '@tanstack/react-query'
import type { Post, PostCategory } from 'database'
import { isEqual, set } from 'lodash-es'
import { HTMLProps, useEffect, useRef, useState } from 'react'
import CategoryBadge from 'src/components/CategoryBadge'
import ErrorCallout from 'src/components/ErrorCallout/ErrorCallout'
import ProtectedComponent from 'src/components/ProtectedComponent'
import useAuthenticatedUser from 'src/hooks/auth/useAuthenticatedUser'
import { API_POSTS_KEY, usePostCreateMutation, usePosts } from 'src/queries/api/posts'
import { emotesTextToHtml } from 'src/services/twitch'
import { usePostsSlice } from 'src/slices/posts'
import { useUISlice } from 'src/slices/ui'
import { extractErrorMessages } from 'src/utils/errors'
import { getCaretCoordinates } from 'src/utils/input'
import { sanitizeContentEditableInputBeforeSubmit } from 'src/utils/string'
import { isURL } from 'src/utils/url'
import { PostCreateRequest, PostCategoryNames, PostsGetResponse, PostQueryParamsSort } from 'types'

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
  const { addCategoryFilter, removeCategoryFilter, getPostsQueryParams, setGetPostsQueryParams, setSort } =
    usePostsSlice()
  const { burgerOpened, setBurgerOpened } = useUISlice()
  const usePostsQuery = usePosts()
  const queryClient = useQueryClient()

  const [titleQuery, setTitleQuery] = useState(getPostsQueryParams?.titleQuery)
  const [newPostModalOpened, setNewPostModalOpened] = useState(false)
  const { classes, theme } = useStyles()
  const emoteTooltipRef = useRef(null)
  const titleInputRef = useRef<HTMLTextAreaElement>(null)
  const [typedEmote, setTypedEmote] = useState('')
  const [awaitEmoteCompletion, setAwaitEmoteCompletion] = useState(false)
  const [calloutErrors, setCalloutErrors] = useState([])
  const { isAuthenticated, user } = useAuthenticatedUser()

  const postCreateForm = useForm<PostCreateRequest>({
    initialValues: {
      ...storedNewPostForm,
    },

    validate: {
      title: (value) =>
        !value || value.trim() === '' || value.trim() === '<br>'
          ? 'Title cannot be empty'
          : value?.length > 150
          ? 'Title can have at most 150 characters.'
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
    const onPostSubmitSuccess = (resData, variables, context) => {
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

      const { cursor, ...otherParams } = getPostsQueryParams

      console.log(resData)

      set(resData, 'User', user.data)
      set(resData, '_count.likedPosts', 0)
      set(resData, '_count.savedPosts', 0)

      queryClient.setQueryData<InfiniteData<PostsGetResponse>>([API_POSTS_KEY, `Get`, otherParams], (data) => ({
        ...data,
        pages: data.pages.map((page, pageIdx) => ({
          ...page,
          data: pageIdx === 0 ? [resData].concat(data) : page.data,
        })),
      }))
    }

    values.title = sanitizeContentEditableInputBeforeSubmit(values.title)

    postCreateMutation.mutate(values, {
      onError(error: any, variables, context) {
        setCalloutErrors(extractErrorMessages(error))
      },
      onSuccess: onPostSubmitSuccess,
    })
  })

  function changeTitleQueryParam() {
    if (titleQuery === '') {
      setGetPostsQueryParams({ ...getPostsQueryParams, titleQuery: undefined })

      return
    }
    setGetPostsQueryParams({ ...getPostsQueryParams, titleQuery: titleQuery })
  }

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
        return !getPostsQueryParams.categories?.includes(c)
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
            position={'right-center' as any}
            withArrow
            shadow="md"
          >
            <Popover.Target>
              <div>
                <Textarea
                  {...postCreateForm.getInputProps('title')}
                  ref={titleInputRef}
                  data-autofocus
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
                <Text size={'xs'} opacity={'60%'}>
                  You can use channel emotes here.
                </Text>
              </div>
            </Popover.Target>
            <Popover.Dropdown>
              <div
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
              gradient={{ from: '#1864ab', to: '#326798', deg: 225 }}
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

  const sortSelectData: { value: PostQueryParamsSort; label: string }[] = [
    {
      value: PostQueryParamsSort.DescendingCreationDate,
      label: 'Descending creation date',
    },
    {
      value: PostQueryParamsSort.AscendingCreationDateByLastSeen,
      label: 'Ascending creation date from last seen',
    },
  ]

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
          {/* TODO debounce queries: for both searchbox and badges :

          https://codesandbox.io/s/ted8o?file=/src/App.js
          */}
          <Card.Section className={classes.section}>
            <TextInput
              id="post-search-box"
              placeholder="Search"
              // icon={<IconSearch size={12} stroke={1.5} />}
              rightSection={
                usePostsQuery.isLoading ? (
                  <Loader size={18} />
                ) : (
                  <ActionIcon
                    variant="filled"
                    bg={theme.colors.blue[9]}
                    opacity={'80%'}
                    onClick={(e) => {
                      changeTitleQueryParam()
                    }}
                  >
                    <IconSearch size={12} stroke={2} />
                  </ActionIcon>
                )
              }
              value={titleQuery}
              onChange={(e) => {
                setTitleQuery(e.target.value)
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  changeTitleQueryParam()
                }
              }}
              // styles={{ rightSection: { pointerEvents: 'none' } }}
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
                <Flex mt={10} gap="md" justify="space-between" align="center" direction="row" wrap={'wrap'}>
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
                      setGetPostsQueryParams({ ...getPostsQueryParams, moderated })
                    }}
                    placeholder="Select posts to show"
                    defaultValue={
                      getPostsQueryParams?.moderated === undefined ? undefined : String(getPostsQueryParams.moderated)
                    }
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
                <Flex mt={10} gap="md" justify="center" align="center" direction="row" wrap={'wrap'}>
                  <Chip
                    variant="filled"
                    color="green"
                    checked={getPostsQueryParams.liked === true}
                    onClick={() =>
                      setGetPostsQueryParams({
                        ...getPostsQueryParams,
                        // no scenario where we want only posts not liked
                        liked: getPostsQueryParams.liked !== true ? true : undefined,
                        saved: getPostsQueryParams.liked !== true ? undefined : getPostsQueryParams.saved,
                      })
                    }
                  >
                    Liked posts
                  </Chip>
                  <Chip
                    variant="filled"
                    color="green"
                    checked={getPostsQueryParams.saved === true}
                    onClick={() =>
                      setGetPostsQueryParams({
                        ...getPostsQueryParams,
                        // no scenario where we want only posts not saved
                        saved: getPostsQueryParams.saved !== true ? true : undefined,
                        liked: getPostsQueryParams.saved !== true ? undefined : getPostsQueryParams.liked,
                      })
                    }
                  >
                    Saved posts
                  </Chip>
                  <Chip
                    variant="filled"
                    color="green"
                    checked={getPostsQueryParams.authorId !== undefined}
                    onClick={() =>
                      setGetPostsQueryParams({
                        ...getPostsQueryParams,
                        // no scenario where we want only posts not authorId
                        authorId: getPostsQueryParams.authorId === undefined ? user.data.id : undefined,
                      })
                    }
                  >
                    My posts
                  </Chip>
                </Flex>
              </Card.Section>

              <Card.Section className={classes.section}>
                <Text mt="md" className={classes.label} color="dimmed">
                  SEARCH SETTINGS
                </Text>
                {/*
                  TODO if lastSeen checked, cursor starts at last seen value but we go backwards (need orderby asc in prisma and reverse pages)
                  also show a notification saying "Showing posts in ascending order"
                  we should store lastSeen in user.lastSeenPost DateTime db.timestamp (like Post.createdAt)
                  */}
                <Flex mt={10} gap="md" justify="space-between" align="center" direction="row" wrap={'wrap'}>
                  <Text className={classes.sideLabel} color="dimmed">
                    Sort
                  </Text>
                  <Select
                    data={sortSelectData}
                    onChange={(value: PostQueryParamsSort) => {
                      setSort(value)
                    }}
                    placeholder="Select post ordering"
                    defaultValue={PostQueryParamsSort.DescendingCreationDate}
                  />
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
                bg={theme.colors.blue[9]}
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
