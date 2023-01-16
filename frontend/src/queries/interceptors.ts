import type axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import dayjs from 'dayjs'

export const requestInterceptor = (config: AxiosRequestConfig) => {
  config.data = updateTimestamps(config.data)
  return config
}

export const responseInterceptor = (response: AxiosResponse) => {
  response.data = updateTimestamps(response.data)
  return response
}

// TODO genereic solution: https://weblog.west-wind.com/posts/2014/jan/06/javascript-json-date-parsing-and-real-dates
export const updateTimestamps = (obj: any, depth = 0) => {
  if (depth > 3) return
  if (Array.isArray(obj)) {
    obj.forEach((element) => {
      if (typeof element === 'object') {
        updateTimestamps(element, depth + 1)
      }
    })
  } else {
    for (const key in obj) {
      if (key === 'createdAt' || key === 'updatedAt') {
        obj[key] = dayjs(obj[key]).toDate()
      }
      if (typeof obj[key] === 'object') {
        updateTimestamps(obj[key], depth + 1)
      }
    }
  }

  return obj
}
