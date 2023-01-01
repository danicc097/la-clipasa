import { Navigate } from 'react-router-dom'
import useAuthenticatedUser from 'src/hooks/auth/useAuthenticatedUser'
import { useEffect, useState } from 'react'
import { Notification } from '@mantine/core'
import { IconX } from '@tabler/icons'

type ProtectedRouteProps = {
  children: JSX.Element
}

/**
 *  Requires an authenticated user.
 */
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  // const { user } = useAuthenticatedUser()
  const [user, setuser] = useState({})

  const [notificationVisible, setNotificationVisible] = useState(false)
  useEffect(() => {
    if (!user) {
      setNotificationVisible(true)
    }
  }, [user])

  const isAuthenticated = true

  if (!user) {
    return <Navigate to="/login" />
  }

  if (!isAuthenticated && user) {
    window.location.replace(`${import.meta.env.VITE_AUTH_SERVER}/login`)
  }

  return (
    <>
      {children}
      {notificationVisible ? (
        <Notification icon={<IconX size={18} />} color="red">
          You need to log in to access this page
        </Notification>
      ) : null}
    </>
  )
}
