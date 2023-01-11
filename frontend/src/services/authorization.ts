import type { Role, User } from 'database'

type RolePermissions = {
  [key in Role]: Role[]
}

const ROLE_PERMISSIONS: Readonly<RolePermissions> = {
  USER: ['USER'],
  MODERATOR: ['MODERATOR', 'USER'],
  ADMIN: ['ADMIN', 'MODERATOR', 'USER'],
}

export const isAuthorized = (user: User, requiredRole: Role) => {
  if (!requiredRole) return true

  if (!user?.role) return false

  return ROLE_PERMISSIONS[requiredRole].includes(user.role)
}

export const getImplicitRoles = (role: Role) => {
  return ROLE_PERMISSIONS[role]
}
