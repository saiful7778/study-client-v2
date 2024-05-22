import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_dashboard/dashboard')({
  component: () => <div>Hello /_dashboard/dashboard!</div>
})