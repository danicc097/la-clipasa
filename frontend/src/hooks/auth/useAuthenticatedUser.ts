import { QueryClient, useQueryClient } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { persister } from 'src/App'
import { UI_SLICE_PERSIST_KEY } from 'src/slices/ui'

export default function useAuthenticatedUser() {
  const queryClient = useQueryClient()

  function logout() {
    Cookies.remove('twitchAccessToken', {
      expires: 365,
      sameSite: 'none',
      secure: true,
    })
    localStorage.removeItem(UI_SLICE_PERSIST_KEY)
    persister.removeClient()
    queryClient.invalidateQueries()
    window.location.reload()
  }

  return {
    logout,
  }
}
