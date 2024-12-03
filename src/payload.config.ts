// storage-adapter-import-placeholder
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import Users from './collections/Users'
import { Media } from './collections/Media'
import { Thingstodo } from './collections/Thingstodo'

import { S3, PAYLOAD_PUBLIC_SERVER_URL } from './utilities/variables'


const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)


export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      icons: [{
        rel: 'icon',
        type: 'image/svg+xml',
        url: '/favicon.svg',
      }]
    },
    livePreview: {
      url: PAYLOAD_PUBLIC_SERVER_URL, 
      collections: ['thingstodo, media, users'],
    }
  },
  collections: [Users, Media, Thingstodo],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || '',
    },
  }),
  upload: {
    limits: {
      fileSize: 2000000, // 2MB, written in bytes
    },
  },
  localization: {
    locales: [
      {
        label: "English",
        code: "en",
      },
      {
        label: "Français",
        code: "fr",
      },
    ],
    defaultLocale: "en",
    // fallback: true,
  },
  sharp,
  plugins: [
    payloadCloudPlugin(),
    s3Storage({
      collections: {
        'media': {
          prefix: "seo",
        },
      },
      bucket: S3.BUCKET!,
      config: {
        credentials: {
          accessKeyId: S3.ACCESS_KEY_ID!,
          secretAccessKey: S3.SECRET_ACCESS_KEY!,
        },
        region: S3.REGION,
        // ... Other S3 configuration
      },
    }),
    seoPlugin({
      collections: [
        'thingstodo',
      ],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => `Leafty — ${doc.title}`,
      generateDescription: ({ doc }) => doc.excerpt
    }),
    redirectsPlugin({
      collections: ["thingstodo"], // 'pages'
    }),
  ],
  email: nodemailerAdapter({
    defaultFromAddress: 'cms@leafty.app',
    defaultFromName: 'Payload CMS > Leafty',
    // Nodemailer transportOptions
    transportOptions: {
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_HOST),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    },
  }),
})
