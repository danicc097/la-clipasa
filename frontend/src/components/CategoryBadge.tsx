import { Badge, ColorScheme, Group, MantineGradient } from '@mantine/core'

import postDiamante from 'src/assets/post-diamante.png'
import postOro from 'src/assets/post-oro.png'
import postRana from 'src/assets/post-rana.png'
import emojiMeh from 'src/assets/emoji-meh.png'
import emojiRana from 'src/assets/emoji-rana.png'
import emojiOro from 'src/assets/emoji-oro.png'
import emojiDiamante from 'src/assets/emoji-diamante.png'
import emojiWoki from 'src/assets/emoji-woki.png'
import emojiBongos from 'src/assets/emoji-bongo.png'
import emojiDormido from 'src/assets/emoji-dormido.png'
import { PostCategoryNames } from 'types'
import { IconAlertOctagon, IconVolumeOff } from '@tabler/icons'
import type { PostCategory } from 'database'
import { Interpolation, Theme, css } from '@emotion/react'
import type { HTMLProps } from 'react'

export type PostCategoryKey = keyof typeof PostCategoryNames

export const categoryEmojis: Partial<Record<PostCategoryKey, string>> = {
  DIAMANTE: emojiDiamante,
  RANA: emojiRana,
  ORO: emojiOro,
  MEH: emojiMeh,
  NO_SE_YO: emojiWoki,
  MEME_ARTESANAL: emojiBongos,
  SIN_SONIDO: emojiDormido,
}

const EMOJI_SIZE = 16

export const categoryPreEmojis: Partial<Record<PostCategoryKey, JSX.Element>> = {
  NO_SE_YO: <IconAlertOctagon size={EMOJI_SIZE} />,
}

export const categoryPostEmojis: Partial<Record<PostCategoryKey, JSX.Element>> = {
  // SIN_SONIDO: <IconVolumeOff size={EMOJI_SIZE} />,
  NO_SE_YO: <IconAlertOctagon size={EMOJI_SIZE} />,
}

export const categoryColorGradient: Record<PostCategoryKey, MantineGradient> = {
  MEME_ARTESANAL: { from: 'teal', to: 'lime' },
  DIAMANTE: { from: '#1c95b1', to: '#16758b' },
  RANA: { from: 'teal', to: 'lime' },
  ORO: { from: 'yellow', to: 'yellow' },
  SIN_SONIDO: { from: 'gray', to: 'gray' },
  NO_SE_YO: { from: 'red', to: 'red' },
  MEH: { from: '#c4a051', to: '#c5781a' },
}

/**
 * Restricted to 1 per post.
 */
export const uniqueCategories = {
  DIAMANTE: true,
  ORO: true,
  RANA: true,
}

export type UniqueCategoriesKeys<T extends object> = Extract<keyof T, keyof typeof uniqueCategories>

export type CardBackground = {
  image: string
  color: (theme: ColorScheme) => string
}

export const uniqueCategoryBackground: Record<UniqueCategoriesKeys<typeof PostCategoryNames>, CardBackground> = {
  DIAMANTE: {
    image: postDiamante,
    color: (theme: ColorScheme) => (theme === 'light' ? '#b5d6e2' : '#36525a'),
  },
  RANA: {
    image: postRana,
    color: (theme: ColorScheme) => (theme === 'light' ? '#b4dbbd' : '#334838'),
  },
  ORO: {
    image: postOro,
    color: (theme: ColorScheme) => (theme === 'light' ? '#d9d3a1' : '#2f2b22'),
  },
}

interface CategoryBadgeProps extends HTMLProps<HTMLElement> {
  category: PostCategoryKey | string
  css?: Interpolation<Theme>
}

export default function CategoryBadge(props: CategoryBadgeProps) {
  const { category, css: CSS, ...htmlProps } = props

  return (
    <Badge
      variant="gradient"
      gradient={categoryColorGradient[category] ?? null}
      css={[
        CSS,
        css`
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;

          :hover {
            filter: brightness(1.2);
          }
        `,
      ]}
      {...(htmlProps as any)}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;

          gap: 3px;
        `}
      >
        {categoryEmojis[category] && <img src={categoryEmojis[category]} height={EMOJI_SIZE} width={EMOJI_SIZE} />}
        {categoryPreEmojis[category]}
        <div>{PostCategoryNames[category] ?? category}</div>
        {categoryPostEmojis[category]}
        {categoryEmojis[category] && <img src={categoryEmojis[category]} height={EMOJI_SIZE} width={EMOJI_SIZE} />}
      </div>
    </Badge>
  )
}
