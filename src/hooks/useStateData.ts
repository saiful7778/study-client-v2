import { StateContext } from "@/context/StateContext";
import { useContext } from "react";

export default function useStateData() {
  const stateContext = useContext(StateContext);
  if (typeof stateContext === "undefined") {
    throw new Error("Error in stateContext");
  }
  return stateContext;
}
