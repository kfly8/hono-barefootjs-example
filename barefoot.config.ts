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
  // WORKAROUND (pending an upstream @barefootjs/form build fix):
  // its published dist bundles the @barefootjs/client peer dep instead of
  // leaving it external, so loading dist as-is would give the form its own
  // reactive runtime — separate from barefoot.js — and bindings wouldn't
  // update. Until the package externalizes its peers, we re-bundle it from
  // source here; bundleEntries auto-externalizes @barefootjs/client, so the
  // importmap resolves it to barefoot.js (one shared runtime). Once fixed,
  // this entry can go away and @barefootjs/form moves into `externals`.
  bundleEntries: [
    { entry: 'node_modules/@barefootjs/form/src/index.ts', outfile: 'form.js' },
  ],
  externals: {
    // Browser-resolvable client deps, surfaced via the importmap.
    zod: { url: 'https://esm.sh/zod@4.4.3', preload: true },
    '@barefootjs/form': { url: '/components/form.js' },
  },
})
