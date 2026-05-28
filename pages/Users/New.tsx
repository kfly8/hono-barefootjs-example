import { Layout } from '../Layout'
import { UserForm } from '@/components/UserForm'

interface UsersNewProps {
  values: { name: string; email: string; bio: string }
}

export function UsersNew({ values }: UsersNewProps) {
  return (
    <Layout>
      <p>
        <a href="/users">← Back to users</a>
      </p>
      <h1>New user</h1>
      <UserForm
        initialName={values.name}
        initialEmail={values.email}
        initialBio={values.bio}
      />
    </Layout>
  )
}
