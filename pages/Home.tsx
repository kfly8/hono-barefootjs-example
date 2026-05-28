import { Layout } from './Layout'

export function Home({ message }: { message: string }) {
  return (
    <Layout>
      <h1>{message}</h1>
    </Layout>
  )
}
