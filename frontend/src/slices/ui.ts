import Cookies from 'js-cookie'
import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export type Theme = 'dark' | 'light'

interface UIState {
  twitchToken: string
  setTwitchToken: (token: string) => void
}
export const TWITCH_ACCESS_TOKEN_COOKIE = 'twitchAccessToken'

export const UI_SLICE_PERSIST_KEY = 'ui-slice'

const useUISlice = create<UIState>()(
  devtools(
    persist(
      (set) => {
        return {
          twitchToken: Cookies.get(TWITCH_ACCESS_TOKEN_COOKIE),
          setTwitchToken: (token: string) => set(setTwitchToken(token), false, `setTwitchToken`),
        }
      },
      { version: 2, name: UI_SLICE_PERSIST_KEY },
    ),
    { enabled: true },
  ),
)

export { useUISlice }

type UIAction = (...args: any[]) => Partial<UIState>

function setTwitchToken(token: string): UIAction {
  return (state: UIState) => {
    Cookies.set(TWITCH_ACCESS_TOKEN_COOKIE, token, {
      expires: 365,
      sameSite: 'none',
      secure: true,
    })
    return {
      twitchToken: token,
    }
  }
}
