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
  // @barefootjs/form's published dist bundles its own copy of the
  // @barefootjs/client runtime, which would NOT share barefoot.js's
  // reactive graph in the browser (signals created inside the form
  // wouldn't be tracked by the island's effects). Re-bundle it from
  // source instead: bundleEntries keeps @barefootjs/client external
  // (auto-added to every bundle's externals), so the importmap below
  // resolves it to barefoot.js — one shared runtime.
  bundleEntries: [
    { entry: 'node_modules/@barefootjs/form/src/index.ts', outfile: 'form.js' },
  ],
  externals: {
    // Browser-resolvable client deps, surfaced via the importmap.
    zod: { url: 'https://esm.sh/zod@4.4.3', preload: true },
    '@barefootjs/form': { url: '/components/form.js' },
  },
})
