import { Layout } from '../Layout'
import type { User } from '../../data'

export function UsersIndex({ users }: { users: User[] }) {
  return (
    <Layout>
      <h1>Users</h1>
      <p>
        <a href="/users/new">+ New user</a>
      </p>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <a href={`/users/${user.id}`}>{user.name}</a> &lt;{user.email}&gt;
          </li>
        ))}
      </ul>
    </Layout>
  )
}
