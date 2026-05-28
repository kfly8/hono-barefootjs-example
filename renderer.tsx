import { jsxRenderer } from 'hono/jsx-renderer'
import { BfImportMap } from '@barefootjs/hono/app'
import { BfScripts } from '@barefootjs/hono/scripts'
import manifest from './public/components/manifest.json'
import externals from './public/barefoot-externals.json'

declare module 'hono' {
  interface ContextRenderer {
    (children: unknown, props?: { title?: string }): Response
  }
}

const componentsBase = '/components'

export const renderer = jsxRenderer(({ children, title }) => (
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title ?? 'Hono x BarefootJS'}</title>
      <link rel="stylesheet" href="/styles.css" />
      {/* Import map for the island's bare deps (zod + @barefootjs/form).
          BfImportMap merges them with @barefootjs/client → barefoot.js
          and emits the modulepreload hints. */}
      <BfImportMap base={componentsBase} externals={externals} />
    </head>
    <body>
      {children}
      <BfScripts base={componentsBase} manifest={manifest} />
    </body>
  </html>
))
