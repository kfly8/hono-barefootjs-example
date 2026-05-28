import { Layout } from '../Layout'
import type { User } from '../../data'

export function UsersShow({ user }: { user: User }) {
  return (
    <Layout>
      <p>
        <a href="/users">← Back to users</a>
      </p>
      <h1>{user.name}</h1>
      <dl>
        <dt>Email</dt>
        <dd>{user.email}</dd>
        <dt>Bio</dt>
        <dd>{user.bio}</dd>
      </dl>
    </Layout>
  )
}
