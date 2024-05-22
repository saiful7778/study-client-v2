import useAuthInfo from "@/hooks/useAuthInfo";
import { Loader } from "@/pages/Loader";
import { Navigate, useLocation } from "@tanstack/react-router";
import { ReactNode } from "react";

const PrivateRouteProtector = ({ children }: { children: ReactNode }) => {
  const { loader, user } = useAuthInfo();
  const location = useLocation();

  if (loader) {
    return <Loader />;
  }
  if (user) {
    return children;
  }
  return <Navigate to="/sign-in" from={location.pathname} />;
};

export default PrivateRouteProtector;
