import Cookies from 'js-cookie'
import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export type Theme = 'dark' | 'light'

interface UIState {
  twitchToken: string
  setTwitchToken: (token: string) => void
}

// TODO https://tanstack.com/query/v4/docs/react/guides/ssr
// probably wont need anything else

const useUISlice = create<UIState>()(
  devtools(
    // persist(
    (set) => {
      return {
        twitchToken: Cookies.get('twitchAccessToken'),
        setTwitchToken: (token: string) => set(setTwitchToken(token), false, `setTwitchToken`),
      }
    },
    //   { version: 2, name: 'ui-slice' },
    // ),
    { enabled: true },
  ),
)

export { useUISlice }

type UIAction = (...args: any[]) => Partial<UIState>

function setTwitchToken(token: string): UIAction {
  return (state: UIState) => {
    Cookies.set('twitchAccessToken', token, {
      expires: 365,
      sameSite: 'none',
      secure: true,
    })
    return {
      twitchToken: token,
    }
  }
}
