import { parseEmotesText } from 'src/services/twitch'
import emoteSrc from './emotes.json'
import { describe, expect, it, test } from 'vitest'

describe('roles and scopes', async () => {
  const text = 'some: :emote:, and calieAMOR2'
  test('parse emotes', () => {
    const size = 20
    const newHtml = parseEmotesText(text, size)
    expect(newHtml).toBe(
      `some: :emote:, and <Image className="calieAMOR2" src="${emoteSrc['calieAMOR2']}" width="${size}" height="${size}" /> `,
    )
  })
})
