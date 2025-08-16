import { CollectionConfig } from 'payload'
import { canManageContent, isAdmin, isSelf } from '../../common/access-control.js'
import { adminGroup } from '../../groups.js'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: {
      en: 'User',
      es: 'Usuario',
    },
    plural: {
      en: 'Users',
      es: 'Usuarios',
    },
  },
  auth: true,
  defaultSort: 'email',
  defaultPopulate: {
    email: true,
    role: true,
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'role', 'updatedAt'],
    listSearchableFields: ['id', 'email', 'role'],
    group: adminGroup,
  },
  access: {
    read: ({ req, id }) => isSelf(req, id!, 'users') || isAdmin(req),
    create: ({ req }) => isAdmin(req),
    update: ({ req, id }) => isSelf(req, id!, 'users') || isAdmin(req),
    delete: ({ req }) => isAdmin(req),
    admin: canManageContent,
  },
  fields: [
    {
      name: 'role',
      label: {
        en: 'Role',
        es: 'Rol',
      },
      type: 'radio',
      options: [
        { value: 'editor', label: { en: 'Editor', es: 'Editor' } },
        { value: 'admin', label: { en: 'Admin', es: 'Administrador' } },
      ],
      defaultValue: 'editor',
      required: true,
      access: {
        create: ({ req }) => isAdmin(req),
        update: ({ req }) => isAdmin(req),
      },
    },
  ],
}
