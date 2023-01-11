import type { Role } from 'database'
import type { ReactNode } from 'react'
import useAuthenticatedUser from 'src/hooks/auth/useAuthenticatedUser'
import { isAuthorized } from 'src/services/authorization'

type ProtectedComponentProps = {
  children: JSX.Element
  requiredRole?: Role
}

export default function ProtectedComponent({ children, requiredRole }: ProtectedComponentProps) {
  const { user } = useAuthenticatedUser()

  if (!isAuthorized(user.data, requiredRole)) return null

  return children
}
