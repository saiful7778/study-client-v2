import Navbar from "@/shared/Navbar";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: MainLayout,
  notFoundComponent: () => {
    return <p>This setting page doesn't exist!</p>;
  },
});

function MainLayout() {
  return (
    <div className="container">
      <header>
        <Navbar />
        {/* {location.pathname === "/" ? <Banner /> : ""} */}
      </header>
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  );
}
