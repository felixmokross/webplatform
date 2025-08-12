import type { CollectionSlug, Endpoint, GlobalSlug } from 'payload'

import { getValueByPath } from '../common/utils.js'

export const translationsEndpoint: Endpoint = {
  handler: async (req) => {
    if (!req.user) {
      return new Response(null, { status: 401, statusText: 'Unauthorized' })
    }

    const collection = req.searchParams.get('collection') as CollectionSlug | undefined
    const global = req.searchParams.get('global') as GlobalSlug | undefined
    const id = req.searchParams.get('id')

    if (!collection && !global) {
      return new Response(JSON.stringify({ message: "'collection' or 'global' is required" }), {
        status: 400,
        statusText: 'Bad Request',
      })
    }

    if (collection && !id) {
      return new Response(JSON.stringify({ message: "'id' is required for collections" }), {
        status: 400,
        statusText: 'Bad Request',
      })
    }

    const fieldPath = req.searchParams.get('fieldPath')
    if (!fieldPath) {
      return new Response(JSON.stringify({ message: "'fieldPath' is required" }), {
        status: 400,
        statusText: 'Bad Request',
      })
    }
    const data =
      collection && id
        ? await req.payload.findByID({
            id,
            collection,
            locale: 'all',
          })
        : await req.payload.findGlobal({ slug: global!, locale: 'all' })

    return new Response(JSON.stringify({ value: getValueByPath(data, fieldPath) }), {
      headers: {
        'content-type': 'application/json',
      },
      status: 200,
    })
  },
  method: 'get',
  path: '/translations',
}
