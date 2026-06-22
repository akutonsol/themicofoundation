
/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.jsx` route
 */
'use client'

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {apiVersion, dataset, projectId} from './src/sanity/env'
import {schema} from './src/sanity/schemaTypes'
import {structure} from './src/sanity/lib/structure'
import {smartPasteInput} from './src/sanity/components/smartPasteInput'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  form: {
    components: {
      // Reflow hard-wrapped text on paste for all multi-line `text` fields.
      input: smartPasteInput,
    },
  },
  plugins: [
    structureTool({structure}),
    visionTool({defaultApiVersion: apiVersion}),
  ],
})