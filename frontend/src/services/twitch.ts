import { sanitizeContentEditableInput } from 'src/utils/string'
import emoteSrc from './emotes.json'

// alternatively check every time we log in. can GET more than 1 user with &login=<loginname>
export const broadcaster = {
  id: 52341091,
  name: 'caliebre',
}

export const imgAttributes = 'style="pointer-events: none;"'

export const anyKnownEmoteRe = `${Object.keys(emoteSrc).join('|')}`

/**
 * Returns an html string with known emotes replaced.
 * @example
  function Title() {
    return <h1 dangerouslySetInnerHTML={{ __html: emotesTextToHtml(title) }} />;
  }
 */
export function emotesTextToHtml(text: string, size: number) {
  if (!text) return

  let newHtml = text
  const emotes = new Set(newHtml.match(new RegExp(anyKnownEmoteRe, 'gi')))

  emotes?.forEach((emote) => {
    emote = emote.toLowerCase()
    newHtml = newHtml.replace(
      new RegExp(`${emote}`, 'gi'),
      `<img ${imgAttributes} title="${emote}" className="${emote}" src="${emoteSrc[emote]}" width="${size}" height="${size}">`,
    )
  })

  return newHtml
}

export function htmlToEmotesText(html: string) {
  if (!html) return

  let plainText = html.replace(/<img[^>]+className\s*=\s*"([^"]*)"[^>]*>/gi, (match, className) => {
    return className
  })

  plainText = sanitizeContentEditableInput(plainText)

  return plainText
}
