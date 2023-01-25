import { Badge, ColorScheme, MantineGradient } from '@mantine/core'

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
import emojiSusto1 from 'src/assets/emoji-susto1.png'
import emojiSusto2 from 'src/assets/emoji-susto2.png'
import emojiTravieso from 'src/assets/emoji-travieso.png'
import { PostCategoryNames } from 'types'
import { Interpolation, Theme, css } from '@emotion/react'
import type { HTMLProps } from 'react'
import React from 'react'

export type PostCategoryKey = keyof typeof PostCategoryNames

export const categoryDoubleEmojis: Partial<Record<PostCategoryKey, string>> = {
  DIAMANTE: emojiDiamante,
  RANA: emojiRana,
  ORO: emojiOro,
  MEH: emojiMeh,
  NO_SE_YO: emojiWoki,
  MEME_ARTESANAL: emojiBongos,
  SIN_SONIDO: emojiDormido,
  GRR: emojiTravieso,
}

export const categoryEmojis: Partial<Record<PostCategoryKey, string>> = {
  DIAMANTE: emojiDiamante,
  RANA: emojiRana,
  ORO: emojiOro,
  MEH: emojiMeh,
  NO_SE_YO: emojiWoki,
  MEME_ARTESANAL: emojiBongos,
  SIN_SONIDO: emojiDormido,
  GRR: emojiTravieso,
  ALERTA_GLONETILLO: emojiSusto1,
}

const EMOJI_SIZE = 16

export const categoryPreEmojis: Partial<Record<PostCategoryKey, JSX.Element>> = {
  ALERTA_GLONETILLO: <img src={emojiSusto1} height={EMOJI_SIZE} width={EMOJI_SIZE} />,
  // NO_SE_YO: <IconAlertOctagon size={EMOJI_SIZE} />,
}

export const categoryPostEmojis: Partial<Record<PostCategoryKey, JSX.Element>> = {
  // SIN_SONIDO: <IconVolumeOff size={EMOJI_SIZE} />,
  ALERTA_GLONETILLO: <img src={emojiSusto2} height={EMOJI_SIZE} width={EMOJI_SIZE} />,
  // NO_SE_YO: <IconAlertOctagon size={EMOJI_SIZE} />,
}

export const categoryColorGradient: Record<PostCategoryKey, MantineGradient> = {
  MEME_ARTESANAL: { from: 'teal', to: 'lime' },
  DIAMANTE: { from: '#1c95b1', to: '#16758b' },
  RANA: { from: 'teal', to: 'lime' },
  ORO: { from: 'yellow', to: 'yellow' },
  SIN_SONIDO: { from: 'gray', to: 'gray' },
  NO_SE_YO: { from: 'red', to: 'red' },
  MEH: { from: '#c4a051', to: '#c5781a' },
  ALERTA_GLONETILLO: { from: '#a051c4', to: '#9a6fae' },
  GRR: { from: '#51c4ab', to: '#94ccc0' },
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

function CategoryBadge(props: CategoryBadgeProps) {
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
        {categoryDoubleEmojis[category] && (
          <img src={categoryDoubleEmojis[category]} height={EMOJI_SIZE} width={EMOJI_SIZE} />
        )}
        {categoryPreEmojis[category]}
        <div>{PostCategoryNames[category] ?? category}</div>
        {categoryPostEmojis[category]}
        {categoryDoubleEmojis[category] && (
          <img src={categoryDoubleEmojis[category]} height={EMOJI_SIZE} width={EMOJI_SIZE} />
        )}
      </div>
    </Badge>
  )
}

export default React.memo(CategoryBadge)
