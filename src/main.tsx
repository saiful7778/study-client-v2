import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import AuthContextProvider from "@/context/AuthContext";
import StateContextProvider from "@/context/StateContext";
import "@/assets/styles/global.css";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { LoaderFullPage } from "@/pages/Loader";
import NotFound from "@/pages/NotFound";
import ErrorPage from "@/pages/Error";

// Create a new router instance
const router = createRouter({
  routeTree,
  defaultPendingComponent: LoaderFullPage,
  defaultErrorComponent: ErrorPage,
  defaultNotFoundComponent: NotFound,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <StateContextProvider>
        <AuthContextProvider>
          <RouterProvider router={router} />
        </AuthContextProvider>
      </StateContextProvider>
    </StrictMode>,
  );
}
