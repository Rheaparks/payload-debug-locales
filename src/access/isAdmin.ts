import type { Access, FieldAccess } from 'payload'
import { checkRole } from '../collections/Users/checkRole'

import type { User } from '../payload-types'

export const isAdmin: Access<User> = ({ req: { user } }) => {
  if (!user) return false;

  // Return true of false based on if the user has an admin role
  return user.roles.includes('admin');
}

export const isAdminFieldLevel: FieldAccess<User> = ({ req: { user } }) => {
  if (!user) return false;

  // Return true of false based on if the user has an admin role
  return user.roles.includes('admin');
}

// import type { AccessArgs } from 'payload'

// type isAdmin = (args: AccessArgs<User>) => boolean

// export const admins: isAdmin = ({ req: { user } }) => {
//   return checkRole(['admin'], user ?? undefined)
// }

// export const admins: isAdmin = ({ req: { user } }) => {
//   return user?.roles?.includes('admin');
// };