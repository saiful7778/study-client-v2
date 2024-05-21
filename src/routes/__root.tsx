import { Toaster } from "@/components/ui/toaster";
import { Loader } from "@/pages/Loader";
import Navbar from "@/shared/Navbar";
import {
  Outlet,
  createRootRoute,
  useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { FC } from "react";

const MainLayout: FC = () => {
  const status = useRouterState({ select: (s) => s.status });
  return (
    <div className="container">
      <header>
        <Navbar />
      </header>
      {status === "pending" ? <Loader /> : <Outlet />}
      <Toaster />
      <TanStackRouterDevtools />
    </div>
  );
};

export const Route = createRootRoute({
  component: MainLayout,
});
