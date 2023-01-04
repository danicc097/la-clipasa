import { Navigate, useNavigate } from 'react-router-dom'
import useAuthenticatedUser from 'src/hooks/auth/useAuthenticatedUser'
import { useEffect, useState } from 'react'
import { Notification } from '@mantine/core'
import { IconX } from '@tabler/icons'
import { showNotification } from '@mantine/notifications'
import { useTwitchUser } from 'src/queries/twitch'
import { ErrorPage } from 'src/components/ErrorPage/ErrorPage'

type ProtectedRouteProps = {
  children: JSX.Element
}

/**
 *  Requires an authenticated user.
 */
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuthenticatedUser()
  const twitchUser = useTwitchUser()
  const navigate = useNavigate()

  if (!isAuthenticated && !twitchUser.isLoading && !twitchUser.isRefetching) {
    showNotification({
      id: 'login-required',
      title: 'Login required',
      message: 'You need to log in to access this page',
      color: 'red',
      icon: <IconX size={18} />,
      autoClose: 5000,
    })
  }

  if (!isAuthenticated) {
    return <ErrorPage status={401} />
  }

  return <>{children}</>
}
