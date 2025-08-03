// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
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
      fields: [showField()],
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
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@example.com',
        password: 'password',
      },
    })
  },
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
