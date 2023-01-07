import emoteSrc from './emotes.json'

// alternatively check every time we log in. can GET more than user with &login=<loginname>
export const broadcaster = {
  id: 52341091,
  name: 'caliebre',
}

/**
 * Returns an html string

 * @example
  function Title() {
    return <h1 dangerouslySetInnerHTML={{ __html: emotesTextToHtml(title) }} />;
  }
 */
export function emotesTextToHtml(text: string, size: number) {
  let newHtml = text
  const emotes = newHtml.match(new RegExp(`${Object.keys(emoteSrc).join('|')}`, 'gi'))

  emotes?.forEach((emote) => {
    emote = emote.toLowerCase()
    newHtml = newHtml.replace(
      new RegExp(`${emote}`, 'gi'),
      `<img title="${emote}" className="${emote}" src="${emoteSrc[emote]}" width="${size}" height="${size}">`,
    )
  })

  return newHtml
}

// TODO
export function htmlToEmotesText(html: string) {
  const plainText = html.replace(/<img[^>]+className\s*=\s*"([^"]*)"[^>]*>/gi, (match, className) => {
    return className
  })

  return plainText
}
