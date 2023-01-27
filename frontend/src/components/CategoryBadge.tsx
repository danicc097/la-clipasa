import { Badge, ColorScheme, MantineGradient, useMantineTheme } from '@mantine/core'

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
import spiderWeb from 'src/assets/icon-spider-web.svg'
import ear from 'src/assets/icon-ear.svg'
import { PostCategoryNames } from 'types'
import { Interpolation, Theme, css } from '@emotion/react'
import type { HTMLProps } from 'react'
import React from 'react'
import type { PostCategory } from 'database'

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
  RAGUUUL: spiderWeb,
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
  RAGUUUL: spiderWeb,
  ENSORDECEDOR: ear,
}

export const emojiInversion: Partial<Record<PostCategoryKey, true>> = {
  RAGUUUL: true,
  ENSORDECEDOR: true,
}

const EMOJI_SIZE = 16

export const categoryPreEmojis: Partial<Record<PostCategoryKey, string>> = {
  ALERTA_GLONETILLO: emojiSusto1,
  // NO_SE_YO: <IconAlertOctagon size={EMOJI_SIZE} />,
}

export const categoryPostEmojis: Partial<Record<PostCategoryKey, string>> = {
  ALERTA_GLONETILLO: emojiSusto2,
  ENSORDECEDOR: ear,
}

export const categoryColorGradient: Record<PostCategoryKey, MantineGradient> = {
  MEME_ARTESANAL: { from: 'teal', to: 'lime' },
  DIAMANTE: { from: '#1c95b1', to: '#16758b' },
  RANA: { from: '#c38d64', to: 'lime', deg: 45 },
  ORO: { from: 'yellow', to: '#b9bd32' },
  SIN_SONIDO: { from: '#727272', to: '#878585' },
  NO_SE_YO: { from: 'red', to: 'red' },
  MEH: { from: '#c4a051', to: '#c5781a' },
  ALERTA_GLONETILLO: { from: '#a051c4', to: '#9a6fae' },
  GRR: { from: '#51c4ab', to: '#94ccc0' },
  ENSORDECEDOR: { from: '#963429', to: '#dc4439' },
  RAGUUUL: { from: '#92946d', to: '#5d5d1f' },
}

interface CategoryBadgeProps extends HTMLProps<HTMLElement> {
  category: PostCategoryKey | string
  css?: Interpolation<Theme>
}

function CategoryBadge(props: CategoryBadgeProps) {
  const { category, css: CSS, ...htmlProps } = props
  const theme = useMantineTheme()

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
        {renderEmoji(categoryDoubleEmojis)}
        {renderEmoji(categoryPreEmojis)}
        <div>{PostCategoryNames[category] ?? category}</div>
        {renderEmoji(categoryPostEmojis)}
        {renderEmoji(categoryDoubleEmojis)}
      </div>
    </Badge>
  )

  function renderEmoji(emojis): React.ReactNode {
    return (
      emojis[category] && (
        <img
          css={css`
            filter: ${emojiInversion[category] && 'invert(100%)'};
          `}
          src={emojis[category]}
          height={EMOJI_SIZE}
          width={EMOJI_SIZE}
        />
      )
    )
  }
}

export default React.memo(CategoryBadge)
