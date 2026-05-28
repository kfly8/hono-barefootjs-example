import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { renderer } from './renderer'
import { Home } from './pages/Home'
import { UsersIndex } from './pages/Users/Index'
import { UsersNew } from './pages/Users/New'
import { UsersShow } from './pages/Users/Show'
import { listUsers, findUser, createUser } from './data'
import { userSchema } from './schema'

const app = new Hono()

app.use('*', renderer)

app.get('/', (c) => c.render(<Home message="Hono x BarefootJS" />, { title: 'Home' }))

app.get('/users', (c) => c.render(<UsersIndex users={listUsers()} />, { title: 'Users' }))

app.get('/users/new', (c) =>
  c.render(<UsersNew values={{ name: '', email: '', bio: '' }} />, {
    title: 'New user',
  }),
)

app.get('/users/:id{[0-9]+}', (c) => {
  const id = Number(c.req.param('id'))
  const user = findUser(id)
  if (!user) return c.notFound()
  return c.render(<UsersShow user={user} />, { title: user.name })
})

app.post(
  '/users',
  // Server-side validation is the security backstop: the client form
  // (@barefootjs/form) validates with the same schema before submitting,
  // so this branch is only reached if the client is bypassed. On failure
  // we re-render New with the submitted values (no 303), keeping invalid
  // data out of the store.
  zValidator('form', userSchema, (result, c) => {
    if (!result.success) {
      const raw = (result as { data?: Record<string, unknown> }).data ?? {}
      return c.render(
        <UsersNew
          values={{
            name: typeof raw.name === 'string' ? raw.name : '',
            email: typeof raw.email === 'string' ? raw.email : '',
            bio: typeof raw.bio === 'string' ? raw.bio : '',
          }}
        />,
        { title: 'New user' },
      )
    }
  }),
  (c) => {
    const input = c.req.valid('form')
    const user = createUser(input)
    return c.redirect(`/users/${user.id}`, 303)
  },
)

export default app
