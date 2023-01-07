import { emotesTextToHtml, htmlToEmotesText } from 'src/services/twitch'
import emoteSrc from './emotes.json'
import { describe, expect, it, test } from 'vitest'

describe('roles and scopes', async () => {
  test('parse emote text to html', () => {
    const text = 'some: :external-emote:, and CALIEAMOR2'
    const size = 20
    const html = emotesTextToHtml(text, size)
    expect(html).toBe(
      `some: :external-emote:, and <img title="calieamor2" className="calieamor2" src="${emoteSrc['calieamor2']}" width="${size}" height="${size}">`,
    )
  })

  test('parse html to emote text', () => {
    const size = 20
    let html = `some: :external-emote:, and <img title="calieamor2" className="calieamor2" src="${emoteSrc['calieamor2']}" width="${size}" height="${size}"> with another <img title="calieamor2" className="calieamor2" src="${emoteSrc['calieamor2']}" width="${size}" height="${size}">`
    let text = htmlToEmotesText(html)
    expect(text).toBe('some: :external-emote:, and calieamor2 with another calieamor2')

    html = `some text before <img title="calieamor2" classname="calieamor2" src="https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_b2a90f8e209e40d697364649cf5a2d2c/static/light/3.0" width="28" height="28"> and after`
    text = htmlToEmotesText(html)
    expect(text).toBe('some text before calieamor2 and after')
  })
})
