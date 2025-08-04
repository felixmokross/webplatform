// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig, TextField } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { showField } from '@fxmk/cms-plugin'

import { Users } from './collections/Users'
import { Media } from './collections/Media'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    autoLogin: {
      email: 'admin@example.com',
      password: 'password',
    },
  },
  collections: [
    Users,
    Media,
    {
      slug: 'posts',
      fields: [
        showField(),
        {
          name: 'text',
          label: {
            en: 'Text',
            es: 'Texto',
          },
          type: 'text',
          localized: true,
          required: true,
          admin: {
            components: {
              Label: '@fxmk/cms-plugin/client#TranslationsFieldLabel',
            },
          },
        } as TextField,
      ],
    },
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  onInit: async (payload) => {
    // add admin user if it doesn't exist
    const user = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: 'admin@example.com',
        },
      },
      pagination: false,
      limit: 1,
    })
    if (user.totalDocs === 0) {
      await payload.create({
        collection: 'users',
        data: {
          email: 'admin@example.com',
          password: 'password',
        },
      })
    }
  },
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
