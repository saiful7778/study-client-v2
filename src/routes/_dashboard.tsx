import PrivateRouteProtector from "@/routesProtector/PrivateRouteProtector";
import Sidebar from "@/shared/Sidebar";
import { Outlet, createFileRoute } from "@tanstack/react-router";
import { FC } from "react";

const DashboardLayout: FC = () => {
  return (
    <main className="flex flex-col gap-2 py-8 md:flex-row">
      <Sidebar />
      <div className="p-2">
        <Outlet />
      </div>
    </main>
  );
};

export const Route = createFileRoute("/_dashboard")({
  component: () => (
    <PrivateRouteProtector>
      <DashboardLayout />
    </PrivateRouteProtector>
  ),
});
