import type { Child } from 'hono/jsx'

export function Layout({ children }: { children?: Child }) {
  return (
    <div className="app">
      <header>
        <nav>
          <a href="/">Home</a>
          <a href="/users">Users</a>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  )
}
