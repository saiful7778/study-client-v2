import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { FC } from "react";

const AuthLayout: FC = () => {
  return (
    <div className="flex min-h-[90vh] w-full items-center justify-center py-4">
      <Outlet />
    </div>
  );
};

export const Route = createFileRoute("/_auth")({
  beforeLoad: ({ context: { loader, auth } }) => {
    if (!loader && auth) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: AuthLayout,
});
