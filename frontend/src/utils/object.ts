import type { Primitive } from 'types'

/**
 * Returns keys in `obj` that are also present in `ref`
 */
export function getMatchingKeys<T extends Primitive>(obj: any[], ref: Record<T, any>) {
  const matches = []
  for (const key of obj) {
    if (key in ref) {
      matches.push(key)
    }
  }

  return matches
}
