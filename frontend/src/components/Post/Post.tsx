import {
  createStyles,
  Card,
  Group,
  Text,
  Avatar,
  Space,
  Button,
  Flex,
  Skeleton,
  CSSObject,
  AspectRatio,
} from '@mantine/core'
import { IconExternalLink, IconInfoCircle } from '@tabler/icons'
import { css } from '@emotion/react'
import type { PostResponse } from 'types'
import React, { HTMLProps, useContext, useEffect, useMemo, useState } from 'react'
import { truncate } from 'lodash-es'
import type { Post } from 'database' // cant use PostCategory exported const
import CategoryBadge, { emojiInversion } from 'src/components/CategoryBadge'
import { emotesTextToHtml } from 'src/services/twitch'
import { usePostsSlice } from 'src/slices/posts'
import { showRelativeTimestamp } from 'src/utils/date'
import { useQueryClient } from '@tanstack/react-query'
import { closeAllModals, openModal } from '@mantine/modals'
import DeleteButton from 'src/components/Post/buttons/DeleteButton'
import EditButton from 'src/components/Post/buttons/EditButton'
import ModerateButton from 'src/components/Post/buttons/ModerateButton'
import CategoryEditButton from 'src/components/Post/buttons/CategoryEditButton'
import RestoreButton from 'src/components/Post/buttons/RestoreButton'
import LikeButton from 'src/components/Post/buttons/LikeButton'
import SaveButton from 'src/components/Post/buttons/SaveButton'
import LastSeenButton from 'src/components/Post/buttons/LastSeenButton'
import ShareButton from 'src/components/Post/buttons/ShareButton'
import { usePosts } from 'src/queries/api/posts'
import { useTwitterEmbed } from 'src/queries/api/twitter'
import { CardBackground, uniqueCategoryBackground } from 'src/services/categories'
import useAuthenticatedUser from 'src/hooks/auth/useAuthenticatedUser'
import ErrorCallout from 'src/components/ErrorCallout/ErrorCallout'
import { InstagramEmbed, TwitterEmbed, YouTubeEmbed } from 'react-social-media-embed'
import { getServiceAndId } from 'src/services/services'

const useStyles = createStyles((theme) => {
  const shadowColor = theme.colorScheme === 'dark' ? '0deg 0% 10%' : '0deg 0% 50%'
  const footerBackground = `${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`

  const cardStyle: CSSObject = {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    minWidth: '100%',
    float: 'left',
    overflow: 'hidden',
    // should rework it with gradient shadow instead of border
    // border: `6px solid ${theme.colorScheme === 'dark' ? '#212327' : '#ddd8e4'}`,
    boxShadow: `inset 2px 2px 15px ${theme.colorScheme === 'dark' ? '#524f541d' : '#9993a436'},
    0 2px 10px ${theme.colorScheme === 'dark' ? '#3f3c4025' : '#d5d0df1c'}`,
    transition: 'all .3s ease-in-out',

    [theme.fn.smallerThan('sm')]: {
      width: '90vw',
    },

    ':hover': {
      WebkitTransition: 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)',
      transition: 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)',
      transform: 'translate3d(0px, -2px, 0)',
      cursor: 'pointer',
      boxShadow: `
          1px 2px 2px hsl(${shadowColor} / 0.333),
          2px 4px 4px hsl(${shadowColor} / 0.333),
          1px 3px 3px hsl(${shadowColor} / 0.333)
        `,
    },
  }

  return {
    skeletonCard: {
      ...cardStyle,

      backgroundColor: theme.colorScheme === 'light' ? '#abaaaa2c' : '#3f3a3a2f',
      borderRadius: '15px',
      ':hover': {},
      boxShadow: 'none',
      animation: 'fade-in-color 1.8s infinite',
      '@keyframes fade-in-color': {
        '0%': {
          opacity: theme.colorScheme === 'light' ? 0.3 : 1,
        },
        '50%': {
          opacity: 0,
        },
        '100%': {
          opacity: theme.colorScheme === 'light' ? 0.3 : 1,
        },
      },
    },

    card: cardStyle,

    title: {
      fontSize: '1.5rem',
      paddingRight: '3rem', // for bg decorations
    },

    footer: {
      padding: `${theme.spacing.xs}px ${theme.spacing.lg}px`,
      marginTop: theme.spacing.md,
      background: footerBackground,
    },
  }
})

interface PostProps extends HTMLProps<HTMLButtonElement> {
  /**
   * Overrides a default image for a category
   */
  post: PostResponse
  backgroundImage?: string
  footer: JSX.Element
}

export const PostContext = React.createContext<PostResponse>(null)

/**
 * Interesting possiblities:
 *  - broadcast poll creation per each post if role higher than user
 *
 */
function Post(props: PostProps) {
  const queryClient = useQueryClient()
  const { post, backgroundImage, footer, className, ...htmlProps } = props

  const { classes, theme } = useStyles()
  const usePostsQuery = usePosts()
  // TODO we will have to use regular fetch for this, on modal opened
  // const useTwitterEmbedQuery = useTwitterEmbed('https://twitter.com/caliebre/status/1608936054819782660')
  const { isAuthenticated, user } = useAuthenticatedUser()

  // in case of implementing, will filter global deleted slice array to check if postDeleted
  const [postDeleted, setPostDeleted] = useState(false)

  const { getPostsQueryParams } = usePostsSlice()

  const cardBackground: CardBackground =
    uniqueCategoryBackground[post?.categories?.find((c) => uniqueCategoryBackground[c])]
  const cardBackgroundImage = backgroundImage ? backgroundImage : cardBackground ? cardBackground.image : 'auto'
  const cardBackgroundColor = backgroundImage
    ? 'auto'
    : cardBackground
      ? cardBackground.color(theme.colorScheme)
      : 'auto'

  if (!post) return null


  function renderFooter() {
    return (
      <Card.Section className={classes.footer}>
        <Group position="apart">
          <Text size="xs" color="dimmed">
            {footer}
          </Text>
          <Group spacing={8}>
            <LikeButton />
            <SaveButton />
            <LastSeenButton />
            <ShareButton />
            <ModerateButton />
            <EditButton />
            <DeleteButton />
          </Group>
        </Group>
      </Card.Section>
    )
  }

  function renderMetadata() {
    return (
      <Group>
        <Avatar src={post.User?.profileImage} radius="sm" />
        <div>
          <Text weight={500}>{post.User?.displayName}</Text>
          <Text size="xs" color="dimmed">
            {showRelativeTimestamp(post.createdAt?.toISOString())}
          </Text>
        </div>
      </Group>
    )
  }

  function renderTitle() {
    return (
      <Text
        weight={700}
        className={classes.title}
        mt="xs"
        dangerouslySetInnerHTML={{ __html: emotesTextToHtml(truncate(post.title, { length: 100 }), 28) }}
      ></Text>
    )
  }

  function renderBody() {
    return (
      <Text weight={700} className={classes.title} m={0}>
        <Button
          onClick={(e) => {
            e.stopPropagation()
          }}
          component="a"
          href={post.link}
          target="_blank"
          variant="subtle"
          m={0}
          size="xs"
          leftIcon={<IconExternalLink size={14} />}
        >
          {truncate(post.link, { length: 40 })}
        </Button>
        <Text
          size={'sm'}
          dangerouslySetInnerHTML={{
            __html: emotesTextToHtml(truncate(post.content, { length: 500 }), 20),
          }}
        ></Text>
      </Text>
    )
  }

  function renderCategories() {
    return (
      <Group position="left">
        {post.categories?.map((category, i) => (
          <CategoryBadge
            className="disable-select"
            key={i}
            category={category}
            css={css`
              pointer-events: none;
              box-shadow: 1px 2px 4px ${theme.colorScheme === 'dark' ? '#8786881d' : '#5a5a5a36'};
              :hover {
                filter: none;
              }
              /* :active {
                  filter: opacity(0.6);
                } */
            `}
          />
        ))}
        <CategoryEditButton />
      </Group>
    )
  }

  function renderCallout(): React.ReactNode {
    const messages = ['Pending moderation']
    if (post.moderationComment) messages.push(post.moderationComment)

    return (
      !post.isModerated &&
      getPostsQueryParams.authorId === user.data?.id && (
        <>
          <Space mb={10} />
          <ErrorCallout title="Unpublished" errors={messages} />
        </>
      )
    )
  }

  return (
    <PostContext.Provider value={post}>
      <Card
        p="lg"
        radius={12}
        className={`${classes.card} ${className ?? ''}`}
        onClick={(e) => {
          const postModalContent = renderPostModal()
          if (!postModalContent) return

          openModal({
            styles: {
              modal: {
                // width: '70%',
                [theme.fn.smallerThan('sm')]: {
                  width: '90vw',
                },
              },
              root: {
                zIndex: 10000,
                '.mantine-Modal-modal': {
                  backgroundColor: 'white',
                },
              },
            },
            title: (
              <Text
                color={'black'}
                weight={700}
                mt="xs"
                size={'sm'}
                align={'center'}
                dangerouslySetInnerHTML={{ __html: emotesTextToHtml(truncate(post.title, { length: 60 }), 16) }}
              ></Text>
            ),
            children: postModalContent,
          })
        }}
        /* move to classes */
        css={css`
          background-repeat: no-repeat;
          background-size: auto 100%;
          background-position: right top;
          background-clip: padding-box;
          background-image: url(${cardBackgroundImage});
          background-color: ${cardBackgroundColor};
          background-clip: padding-box;

          animation: 0.4s ease-out 0s 1 animateIn;

          @keyframes animateIn {
            0% {
              transform: translate3d(0px, 15px, 0) scale(0.8);
              filter: blur(3px);
              opacity: var(0.7);
              transition: opacity 0.3s;
            }
          }

          * > :not(.restore-button, .restore-button *),
          ::before {
            filter: ${postDeleted ? 'grayscale(1)' : 'auto'};
            pointer-events: ${postDeleted ? 'none' : 'auto'};
          }
        `}
        {...(htmlProps as any)}
      >
        {props.children}
        {postDeleted && <RestoreButton postId={post.id} />}
        {renderCategories()}
        {renderCallout()}
        {renderTitle()}
        {renderBody()}
        {renderMetadata()}
        {renderFooter()}
      </Card>
    </PostContext.Provider>
  )

  function renderPostModal(): React.ReactNode {
    const { id, service } = getServiceAndId(post.link)

    let element = null

    switch (service) {
      case 'instagram':
        element = (
          <InstagramEmbed
            url={post.link}
            width={'100%'}
            height={800}
          // {...{ style: { maxWidth: '900px', minHeight: '60vh' } }}
          />
        )
        break
      case 'twitter':
        element = (
          <TwitterEmbed
            url={post.link}
            width={'100%'}
            height={800}
          // {...{ style: { maxWidth: '900px', minHeight: '60vh' } }}
          />
        )
        break
      case 'youtube':
        element = (
          <YouTubeEmbed
            url={post.link}
            width={'100%'}
            height={300}
          // {...{ style: { maxWidth: '1400px', minHeight: '60vh' } }}
          />
        )
        break
      case 'unknown':
        window.open(post.link, '_blank').focus()
      default:
        break
    }

    if (!element) return

    return (
      <div
        className="service-content"
        style={{
          display: 'flex',
          justifyContent: 'center',
          textAlign: '-webkit-center' as any,
          maxHeight: '70vh',
          overflow: 'scroll',
        }}
      >
        {element}
      </div>
    )
  }
}

export function PostSkeleton(props: Partial<PostProps>) {
  const { classes, theme } = useStyles()
  const { post, backgroundImage, footer, className, ...htmlProps } = props

  return (
    <Flex
      direction={'column'}
      justify="center"
      p={15}
      className={`${classes.skeletonCard} ${className ?? ''}`}
      {...(htmlProps as any)}
    >
      <Skeleton height={8} mt={6} width="90%" radius="xl" mb="xs" />
      <Skeleton height={8} mt={6} width="90%" radius="xl" mb="xs" />
      <Skeleton height={8} mt={6} width="70%" radius="xl" mb="xs" />
      <Space mb={10} />
      <Flex direction={'row'} align={'center'}>
        <Skeleton height={40} circle />
        <Space ml={10} />
        <Skeleton height={8} width="20%" radius="xl" />
      </Flex>
      <Space mb={20} />
      <Skeleton height={8} mt={6} width="70%" radius="xl" mb="xs" />
    </Flex>
  )
}

export default React.memo(Post)
