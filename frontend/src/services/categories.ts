import type { ColorScheme } from '@mantine/core'
import postDiamante from 'src/assets/post-diamante.png'
import postOro from 'src/assets/post-oro.png'
import postRana from 'src/assets/post-rana.png'
import type { PostCategoryNames } from 'types'

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
