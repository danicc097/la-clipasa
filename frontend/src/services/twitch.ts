import emoteSrc from './emotes.json'

// alternatively check every time we log in. can GET more than user with &login=<loginname>
export const broadcaster = {
  id: 52341091,
  name: 'caliebre',
}

/**
 * FIXME: Parses emotes text
 * we can actually use

 * @example
  function Title() {
    return <h1 dangerouslySetInnerHTML={{ __html: parseEmotesText(title) }} />;
  }
 */
export function parseEmotesText(text: string, size: number) {
  let newHtml = text
  const emotes = newHtml.match(new RegExp(`${Object.keys(emoteSrc).join('|')}`, 'g'))

  emotes?.forEach((emote) => {
    newHtml = newHtml.replace(
      new RegExp(`${emote}`, 'g'),
      `<Image src="${emoteSrc[emote]}" width="${size}" height="${size}" /> `,
    )
  })

  return newHtml
}
