import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

export default function useAuthInfo() {
  const authContext = useContext(AuthContext);
  if (typeof authContext === "undefined") {
    throw new Error("Error in authContext");
  }

  return authContext;
}
