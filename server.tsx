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

// Defense-in-depth: the client form (@barefootjs/form) validates with the
// same schema before submitting, so this only rejects crafted requests that
// bypass it. Bare zValidator answers invalid input with a 400 by default.
app.post('/users', zValidator('form', userSchema), (c) => {
  const input = c.req.valid('form')
  const user = createUser(input)
  return c.redirect(`/users/${user.id}`, 303)
})

export default app
