import { ActionIcon, Tooltip } from '@mantine/core'
import { IconBookmark } from '@tabler/icons'
import { InfiniteData, useQueryClient } from '@tanstack/react-query'
import { useContext, useState } from 'react'
import { useStyles } from 'src/components/Post/buttons/styles'
import { PostContext } from 'src/components/Post/Post'
import ProtectedComponent from 'src/components/ProtectedComponent'
import { API_POSTS_KEY, usePostPatchMutation } from 'src/queries/api/posts'
import { usePostsSlice } from 'src/slices/posts'
import type { PostResponse, PostsGetResponse } from 'types'

interface SaveButtonProps {}

export default function SaveButton({}: SaveButtonProps) {
  const post = useContext(PostContext)
  const queryClient = useQueryClient()
  const { classes, theme } = useStyles()
  const { addCategoryFilter, removeCategoryFilter, getPostsQueryParams } = usePostsSlice()
  const postPatchMutation = usePostPatchMutation()

  const [saveBeacon, setSaveBeacon] = useState(false)

  const hasSaved = post?.savedPosts?.length > 0

  const handleSaveButtonClick = (e) => {
    e.stopPropagation()

    const onSuccess = (data, variables, context) => {
      const { cursor, ...otherParams } = getPostsQueryParams
      queryClient.setQueryData<InfiniteData<PostsGetResponse>>([API_POSTS_KEY, `Get`, otherParams], (data) => ({
        ...data,
        pages: data.pages.map((page) => ({
          ...page,
          data: page.data.map((p) => {
            if (p.id === post.id) {
              console.log('updating react query data')
              if (hasSaved) {
                p.savedPosts = []
              } else {
                p.savedPosts = [{ postId: p.id, userId: p.userId }]
              }
            }
            return p
          }),
        })),
      }))
    }

    // TODO mutation with debounce of 2 seconds
    setSaveBeacon(true)
    postPatchMutation.mutate(
      { postId: String(post.id), body: { saved: !hasSaved } },
      {
        onSuccess,
      },
    )
  }

  return (
    <ProtectedComponent requiredRole="USER">
      <Tooltip label="Bookmark" arrowPosition="center" withArrow>
        <ActionIcon
          className={`${classes.action} ${saveBeacon ? 'beacon' : ''}`}
          onClick={handleSaveButtonClick}
          onAnimationEnd={() => setSaveBeacon(false)}
        >
          <IconBookmark
            size={18}
            color={theme.colors.yellow[6]}
            stroke={1.5}
            {...(hasSaved && { fill: theme.colors.yellow[6] })}
          />
        </ActionIcon>
      </Tooltip>
    </ProtectedComponent>
  )
}
