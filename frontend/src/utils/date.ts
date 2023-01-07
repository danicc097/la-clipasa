import dayjs from 'dayjs'

export function showRelativeTimestamp(timestamp: string) {
  const now = dayjs()
  const date = dayjs(timestamp)
  const diff = now.diff(date, 'minute')
  if (diff < 1) {
    return 'Just now'
  } else if (diff < 60) {
    return `${diff} minutes ago`
  } else if (diff < 1440) {
    return `${Math.floor(diff / 60)} hours ago`
  } else {
    return `${Math.floor(diff / 1440)} days ago`
  }
}
