import useAuthInfo from "@/hooks/useAuthInfo";
import { Loader } from "@/pages/Loader";
import { Navigate } from "@tanstack/react-router";
import { ReactNode } from "react";

const AuthRouteProtector = ({ children }: { children: ReactNode }) => {
  const { loader, user } = useAuthInfo();

  if (loader) {
    return <Loader />;
  }
  if (!user) {
    return children;
  }
  return <Navigate to="/dashboard" />;
};

export default AuthRouteProtector;
