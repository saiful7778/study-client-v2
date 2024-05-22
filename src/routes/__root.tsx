import { Loader } from "@/pages/Loader";
import Navbar from "@/shared/Navbar";
import {
  Outlet,
  createRootRouteWithContext,
  useRouterState,
} from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import { FC } from "react";
import { User } from "firebase/auth";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Footer from "@/shared/Footer";

const MainLayout: FC = () => {
  const status = useRouterState({ select: (s) => s.status });

  return (
    <>
      <div className="container">
        <header>
          <Navbar />
        </header>
        {status === "pending" ? <Loader /> : <Outlet />}
        <TanStackRouterDevtools />
      </div>
      <Footer />
    </>
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
