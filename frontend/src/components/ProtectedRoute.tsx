import { Navigate, useNavigate } from 'react-router-dom'
import useAuthenticatedUser from 'src/hooks/auth/useAuthenticatedUser'
import { useEffect, useState } from 'react'
import { Notification } from '@mantine/core'
import { IconX } from '@tabler/icons'
import { showNotification } from '@mantine/notifications'
import { useTwitchUser } from 'src/queries/twitch'
import { ErrorPage } from 'src/components/ErrorPage/ErrorPage'
import type { Role } from 'database'
import { isAuthorized } from 'src/services/authorization'

type ProtectedRouteProps = {
  children: JSX.Element
  requiredRole?: Role
}

/**
 *  Requires an authenticated user.
 */
export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuthenticatedUser()
  const twitchUser = useTwitchUser()
  const navigate = useNavigate()
  const { user } = useAuthenticatedUser()

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
    if (twitchUser.isLoading || twitchUser.isRefetching) return <></>
    return <ErrorPage status={401} />
  }

  if (!isAuthorized(user.data, requiredRole)) return <>{children}</>
}
