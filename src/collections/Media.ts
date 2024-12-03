import { slateEditor } from '@payloadcms/richtext-slate'
import type { CollectionConfig } from 'payload'
import { isAdminOrEditor } from '../access/isAdminOrEditor'
import { isAdminOrEditorOrUser } from '../access/isAdminOrEditorOrUser'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: true,
  labels: {
    singular: 'Media',
    plural: 'Media',
  },
  access: {
    read: isAdminOrEditorOrUser,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'creditText',
      type: 'text',
      required: false,
    },
    {
      name: 'creditLink',
      type: 'text',
      required: false,
    },
    {
      name: 'title',
      type: 'text',
      required: false,
    }
  ],
}