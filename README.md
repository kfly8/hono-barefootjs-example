# hono-barefootjs-example

[Hono](https://hono.dev) + [Barefoot.js](https://barefootjs.dev) on Cloudflare Workers.

## Pages

- `/` — Home
- `/users` — Users list
- `/users/:id` — User detail
- `/users/new` — Create user (with `@hono/zod-validator`)

## Develop

```sh
bun install
bun run dev
```

## Build & deploy

```sh
bun run deploy
```

## See Also

This project is inspired by https://github.com/yusukebe/hono-inertia-example
