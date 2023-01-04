import { Navigate } from 'react-router-dom'
import useAuthenticatedUser from 'src/hooks/auth/useAuthenticatedUser'
import { useEffect, useState } from 'react'
import { Notification } from '@mantine/core'
import { IconX } from '@tabler/icons'
import { showNotification } from '@mantine/notifications'

type ProtectedRouteProps = {
  children: JSX.Element
}

/**
 *  Requires an authenticated user.
 */
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  // const { user } = useAuthenticatedUser()
  const [user, setuser] = useState({})

  useEffect(() => {
    if (!user) {
      showNotification({
        id: 'login-required',
        title: 'Login required',
        message: 'You need to log in to access this page',
        color: 'red',
        icon: <IconX size={18} />,
        autoClose: 5000,
      })
    }
  }, [user])

  const isAuthenticated = true

  if (!user) {
    return <Navigate to="/login" />
  }

  if (!isAuthenticated && user) {
    window.location.replace(`${import.meta.env.VITE_AUTH_SERVER}/login`)
  }

  return <>{children}</>
}
