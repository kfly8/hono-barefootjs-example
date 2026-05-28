import { jsxRenderer } from 'hono/jsx-renderer'
import { raw } from 'hono/html'
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
      {/* Browser import map for the island's bare deps: zod from a CDN
          and @barefootjs/form bundled from source so its @barefootjs/client
          import resolves to barefoot.js — one shared reactive runtime. */}
      {externals.preloads.map((href) => (
        <link rel="modulepreload" href={href} crossorigin="anonymous" />
      ))}
      <script type="importmap">{raw(JSON.stringify(externals.importmap))}</script>
    </head>
    <body>
      {children}
      <BfScripts base={componentsBase} manifest={manifest} />
    </body>
  </html>
))
