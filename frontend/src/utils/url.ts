export type Params = {
  [key: string]: string | number | Array<string | number> | boolean
}

export const formatURLWithQueryParams = (base: string, params: Params) => {
  if (!params || Object.keys(params)?.length === 0) return base

  const query = Object.entries(params)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return value.map((item) => `${key}=${encodeURIComponent(item)}`).join('&')
      }
      if (value !== undefined) {
        return `${key}=${encodeURIComponent(value)}`
      }
    })
    .filter((e) => e !== undefined)
    .join('&')

  return `${base}?${query}`
}

export function isURL(str: string) {
  let url
  try {
    url = new URL(str)
  } catch (error) {
    return false
  }
  return url.protocol === 'http:' || url.protocol === 'https:'
}
