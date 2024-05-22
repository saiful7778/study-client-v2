import { FC } from "react";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routeTree } from "./routeTree.gen";
import { LoaderFullPage } from "@/pages/Loader";
import NotFound from "@/pages/NotFound";
import ErrorPage from "@/pages/Error";
import useAuth from "@/hooks/useAuth";
import { Toaster } from "@/components/ui/toaster";

const queryClient = new QueryClient();

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    loader: true,
    user: {},
    token: "",
    auth: undefined!,
    queryClient,
  },
  defaultPendingComponent: LoaderFullPage,
  defaultErrorComponent: ErrorPage,
  defaultNotFoundComponent: NotFound,
  defaultPreload: "intent",
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const App: FC = () => {
  const { user, loader, userData, token } = useAuth();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider
        router={router}
        context={{
          auth: user,
          loader,
          user: userData,
          token: `Bearer ${token}`,
        }}
      />
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster />
    </QueryClientProvider>
  );
};

export default App;
