import type axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import dayjs from 'dayjs'

export const requestInterceptor = (config: AxiosRequestConfig) => {
  config.data = addTimestamps(config.data)
  return config
}

export const responseInterceptor = (response: AxiosResponse) => {
  response.data = addTimestamps(response.data)
  return response
}

const addTimestamps = (data: any) => {
  console.log('running addTimestamps interceptor')
  if (data && typeof data === 'object') {
    data.createdAt = dayjs(data.createdAt).toDate()
    data.updatedAt = dayjs(data.updatedAt).toDate()

    for (const key in data) {
      addTimestamps(data[key])
    }
  }
  return data
}
