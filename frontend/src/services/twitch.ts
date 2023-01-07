// alternatively check every time we log in. can GET more than user with &login=<loginname>
export const broadcaster = {
  id: 52341091,
  name: 'caliebre',
}

export const emoteSrc = {
  calieAMOR: 'https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_b2a90f8e209e40d697364649cf5a2d2c/default/dark/3.0',
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
