import type { ColorScheme } from '@mantine/core'
import type { PostCategory } from 'database'
import postDiamante from 'src/assets/post-diamante.png'
import postOro from 'src/assets/post-oro.png'
import postRana from 'src/assets/post-rana.png'
import type { PostCategoryNames } from 'types'

export type CardBackground = {
  image: string
  color: (theme: ColorScheme) => string
}

export const uniqueCategoryBackground: Record<keyof UniqueCategories, CardBackground> = {
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
