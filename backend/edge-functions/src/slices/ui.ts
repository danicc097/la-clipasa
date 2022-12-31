import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export type Theme = 'dark' | 'light'

interface UIState {
  theme: Theme
  setTheme: (theme: Theme) => void
}

// TODO https://tanstack.com/query/v4/docs/react/guides/ssr
// probably wont need anything else

// const useUISlice = create<UIState>()(
//   devtools(
//     // persist(
//     (set) => {
//       return {
//         theme: (theme ?? 'light') as Theme,
//         setTheme: (theme: Theme) => set(setTheme(theme), false, `setTheme-${theme}`),
//       }
//     },
//     //   { version: 2, name: 'ui-slice' },
//     // ),
//     { enabled: true },
//   ),
// )

// export { useUISlice }

type UIAction = (...args: any[]) => Partial<UIState>

function setTheme(theme: Theme): UIAction {
  return (state: UIState) => {
    localStorage.setItem('theme', theme)
    return {
      theme: theme,
    }
  }
}
