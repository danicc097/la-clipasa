import { css } from '@emotion/react'
import {
  ActionIcon,
  Box,
  Button,
  CloseButton,
  Flex,
  MultiSelect,
  MultiSelectValueProps,
  SelectItemProps,
  Space,
  Text,
  Textarea,
  TextInput,
  Tooltip,
  useMantineTheme,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconCheck, IconPlus } from '@tabler/icons'
import { InfiniteData, useQueryClient } from '@tanstack/react-query'
import { forwardRef, useContext, useEffect, useRef, useState } from 'react'
import {
  categoryDoubleEmojis,
  categoryEmojis,
  categoryPostEmojis,
  categoryPreEmojis,
  emojiInversion,
} from 'src/components/CategoryBadge'
import ErrorCallout from 'src/components/ErrorCallout/ErrorCallout'
import { useStyles } from 'src/components/Post/buttons/styles'
import { PostContext } from 'src/components/Post/Post'
import ProtectedComponent from 'src/components/ProtectedComponent'
import { API_POSTS_KEY, usePostPatchMutation, usePosts } from 'src/queries/api/posts'
import { usePostsSlice } from 'src/slices/posts'
import { extractErrorMessages } from 'src/utils/errors'
import { getMatchingKeys } from 'src/utils/object'
import { joinWithAnd } from 'src/utils/string'
import { PostCategoryNames, PostPatchRequest, PostResponse, PostsGetResponse, uniqueCategories } from 'types'

const categoriesData = Object.entries(PostCategoryNames).map(([k, v]) => ({ label: v, value: k }))

const EMOJI_SIZE = 16

function Value({ value, label, onRemove, classNames, ...others }: MultiSelectValueProps & { value: string }) {
  const theme = useMantineTheme()
  const emoji = categoryEmojis[value] ? (
    <Box mr={10}>
      <img
        css={css`
          filter: ${emojiInversion[value] && theme.colorScheme === 'dark' && 'invert(100%)'};
        `}
        src={categoryEmojis[value]}
        height={EMOJI_SIZE}
        width={EMOJI_SIZE}
      />{' '}
    </Box>
  ) : null

  const CB: any = CloseButton // TS2590 workaround

  return (
    <div {...others} onClickCapture={(e) => e.stopPropagation()}>
      <Box
        sx={(theme) => ({
          display: 'flex',
          cursor: 'default',
          alignItems: 'center',
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
          border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[4]}`,
          paddingLeft: 10,
          borderRadius: 4,
        })}
      >
        {emoji}
        <Box sx={{ lineHeight: 1, fontSize: 12 }}>{label}</Box>
        <CB onMouseDown={onRemove} variant="transparent" size={22} iconSize={14} tabIndex={-1} />
      </Box>
    </div>
  )
}

const Item = forwardRef<HTMLDivElement, SelectItemProps>(({ label, value, ...others }, ref) => {
  const theme = useMantineTheme()
  const emoji = (
    <Box mr={10}>
      {categoryEmojis[value] ? (
        <img
          css={css`
            filter: ${emojiInversion[value] && theme.colorScheme === 'dark' && 'invert(100%)'};
          `}
          src={categoryEmojis[value]}
          height={EMOJI_SIZE}
          width={EMOJI_SIZE}
        />
      ) : (
        <Space w={EMOJI_SIZE} />
      )}
    </Box>
  )

  return (
    <div ref={ref} {...others}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {emoji}
        <div>{label}</div>
      </Box>
    </div>
  )
})

interface CategoryEditButtonProps {}

export default function CategoryEditButton({}: CategoryEditButtonProps) {
  const post = useContext(PostContext)
  const queryClient = useQueryClient()
  const { classes, theme } = useStyles()
  const { addCategoryFilter, removeCategoryFilter, getPostsQueryParams } = usePostsSlice()
  const postPatchMutation = usePostPatchMutation()
  const usePostsQuery = usePosts()

  const categoryEditRef = useRef(null)

  const [categoriesEditPopoverOpened, setCategoriesEditPopoverOpened] = useState(false)
  const [calloutErrors, setCalloutErrors] = useState([])

  const postPatchForm = useForm<PostPatchRequest>({
    initialValues: {
      categories: post.categories,
      moderationComment: post.moderationComment,
    },
    validateInputOnChange: true,
    validate: {
      categories: (categories) => {
        const formUniqueCategories = getMatchingKeys(categories, uniqueCategories)
        if (formUniqueCategories.length > 1) {
          return `Cannot have a post with ${joinWithAnd(formUniqueCategories)} at the same time`
        }
      },
    },
  })

  const onCategoriesEditSuccess = (data, variables, context) => {
    const { cursor, ...otherParams } = getPostsQueryParams
    queryClient.setQueryData<InfiniteData<PostsGetResponse>>([API_POSTS_KEY, `Get`, otherParams], (data) => ({
      ...data,
      pages: data.pages.map((page) => ({
        ...page,
        data: page.data.map((p) => {
          if (p.id === post.id) {
            console.log('updating react query data')
            p.categories = postPatchForm.values.categories
            p.moderationComment = postPatchForm.values.moderationComment
          }
          return p
        }),
      })),
    }))
  }

  const onCategoriesEditSubmit = postPatchForm.onSubmit((values) => {
    postPatchMutation.mutate(
      {
        postId: String(post.id),
        body: values,
      },
      {
        onError(error: any, variables, context) {
          setCalloutErrors(extractErrorMessages(error))
        },
        onSuccess: onCategoriesEditSuccess,
      },
    )
  })

  const handleClickOutside = (e: MouseEvent) => {
    const dropdown = document.getElementsByClassName('mantine-MultiSelect-dropdown')[0]
    const multiselect = document.getElementsByClassName('mantine-MultiSelect-root')[0]
    if (dropdown && (e.target === dropdown || dropdown.contains(e.target as Node))) {
      console.log('clicked el is part of dropdown')
    }
    if (multiselect && (e.target === multiselect || multiselect.contains(e.target as Node))) {
      console.log('clicked el is part of multiselect')
    }
    setCategoriesEditPopoverOpened(false)
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const handleCategoriesEditButtonClick = (e) => {
    e.stopPropagation()

    setCategoriesEditPopoverOpened(!categoriesEditPopoverOpened)
  }

  return (
    <ProtectedComponent requiredRole="MODERATOR">
      <Tooltip
        opened={categoriesEditPopoverOpened} // work around popover positioning shenanigans by using tooltip instead
        closeDelay={99999999}
        width={250}
        withinPortal
        styles={{
          tooltip: {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
            flexWrap: 'nowrap',
            width: '400px',

            [theme.fn.smallerThan('sm')]: {
              width: '60vw',
            },
          },
        }}
        label={
          <>
            <ErrorCallout title="Error updating post" errors={calloutErrors} />
            <form onSubmit={onCategoriesEditSubmit} ref={categoryEditRef}>
              <Flex
                direction="column"
                gap={10}
                p={5}
                justify="flex-start"
                onClickCapture={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
                css={css`
                  pointer-events: all;
                  word-wrap: break-word;
                  white-space: pre-wrap;
                  word-break: break-word;
                `}
              >
                <MultiSelect
                  {...postPatchForm.getInputProps('categories')}
                  searchable
                  data={categoriesData}
                  limit={20}
                  valueComponent={Value}
                  itemComponent={Item}
                  placeholder="Pick categories"
                  label="Select post categories"
                />
                {!post.isModerated && (
                  <div>
                    <Textarea
                      {...postPatchForm.getInputProps('moderationComment')}
                      autosize
                      minRows={2}
                      label="Moderation comment"
                    />
                    <Text size={'xs'} opacity={'60%'}>
                      Leave a message to the post author.
                    </Text>
                  </div>
                )}

                <Button
                  loading={postPatchMutation.isLoading}
                  bg={theme.colors.blue[9]}
                  size="xs"
                  type="submit"
                  leftIcon={<IconCheck size={16} stroke={1.5} />}
                >
                  Save
                </Button>
              </Flex>
            </form>
          </>
        }
        // arrowPosition="center"
        position="bottom"
        withArrow
      >
        <ActionIcon
          radius={999999}
          size={22}
          className={`${classes.categoryAction} post-categories-${post.id}`}
          onClick={handleCategoriesEditButtonClick}
        >
          <IconPlus
            color={theme.colorScheme === 'light' ? theme.colors.dark[5] : theme.colors.gray[1]}
            size={12}
            stroke={1.5}
          />
        </ActionIcon>
      </Tooltip>
    </ProtectedComponent>
  )
}
