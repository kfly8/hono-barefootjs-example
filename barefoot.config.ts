import { createConfig } from '@barefootjs/hono/build'

export default createConfig({
  // Build inputs and output. barefoot mirrors the input dir under
  // `outDir`, so `components/` lands at `public/components/` —
  // exactly where Workers Assets serves it from.
  components: ['components'],
  outDir: 'public',
  scriptBasePath: '/components/',
  adapterOptions: {
    clientJsBasePath: '/components/',
    barefootJsPath: '/components/barefoot.js',
  },
  // Bare deps the island imports, surfaced via the importmap. form@0.3.0's
  // dist leaves @barefootjs/client external, so a plain chunk copy shares
  // barefoot.js's reactive runtime (the importmap dedups @barefootjs/client
  // to barefoot.js).
  externals: {
    zod: { url: 'https://esm.sh/zod@4.4.3', preload: true },
    '@barefootjs/form': true,
  },
})
