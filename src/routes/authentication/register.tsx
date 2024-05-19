import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/authentication/register')({
  component: () => <div>Hello /authentication/register!</div>
})