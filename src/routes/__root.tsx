import { Toaster } from "@/components/ui/toaster";
import { Loader } from "@/pages/Loader";
import Navbar from "@/shared/Navbar";
import {
  Outlet,
  createRootRouteWithContext,
  useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { QueryClient } from "@tanstack/react-query";
import { FC } from "react";
import { User } from "firebase/auth";

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

interface RouterContext {
  queryClient: QueryClient;
  auth: User | null | undefined;
  loader: boolean;
  user: object;
  token: string;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: MainLayout,
});
