import type { Access } from 'payload'

import { checkRole } from '../collections/Users/checkRole'

export const isAdminOrEditorOrUser: Access = ({ req: { user } }) => {
    // Scenario #1 - Check if user has the 'admin' role
  if (user) {
    if (user.roles.includes('admin') || user.roles.includes('editor') || user.roles.includes('user')) {
      return true
    }
  } 
  // Scenario #2 - Check if the user is the creator of the document
  
  // Scenario #3 - Disallow all others
  return false;
}