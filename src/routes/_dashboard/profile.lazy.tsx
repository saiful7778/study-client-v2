import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_dashboard/profile")({
  component: () => <div>Hello /_dashboard/profile!</div>,
});
