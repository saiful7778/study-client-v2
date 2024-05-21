import { Outlet, createFileRoute } from "@tanstack/react-router";
import { FC } from "react";

const AuthLayout: FC = () => {
  return (
    <div className="flex min-h-[90vh] w-full items-center justify-center">
      <Outlet />
    </div>
  );
};

export const Route = createFileRoute("/_auth")({
  component: AuthLayout,
});
