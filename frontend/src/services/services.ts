export type Service = 'youtube' | 'instagram' | 'reddit' | 'discord' | 'twitter' | 'unknown'

type URLMetadata = {
  service: Service
  id: string
}

/**
 * Infers metadata for a given URL
 */
export function getServiceAndId(url: string): URLMetadata {
  let service: Service = 'unknown'
  let id: string = null

  if (url.includes('youtube.com')) {
    service = 'youtube'
    id = url.split('v=')[1].split('&')[0]
  } else if (url.includes('instagram.com')) {
    service = 'instagram'
    const segments = url.split('/')
    id = segments[segments.length - 2]
  } else if (url.includes('twitter.com')) {
    service = 'twitter'
    id = url.split('status/')[1].split('?')[0]
  } else if (url.includes('reddit.com')) {
    service = 'reddit'
  } else if (url.includes('discord.com')) {
    service = 'discord'
  }

  return { service, id }
}
