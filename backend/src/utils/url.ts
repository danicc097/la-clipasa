export type Params = {
  [key: string]: string | number | Array<string | number>
}

export type ParamsArray = Array<[string, string | number]>

export const formatURLWithQueryParams = (base: string, params: Params) => {
  if (!params || Object.keys(params)?.length === 0) return base

  const query = Object.entries(params)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return value.map((item) => `${key}=${encodeURIComponent(item)}`).join('&')
      }
      return `${key}=${encodeURIComponent(value)}`
    })
    .join('&')

  return `${base}?${query}`
}
