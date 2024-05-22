import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/assignments")({
  component: () => <div>Hello /assignments!</div>,
});
