import { FC } from "react";
import spinner from "@/assets/img/Animation - 1699411161636.gif";

export const LoaderFullPage: FC = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <img className="w-20" src={spinner} alt="loading spinner" />
    </div>
  );
};

export const Loader: FC = () => {
  return (
    <div className="flex w-full items-center justify-center">
      <img className="w-20" src={spinner} alt="loading spinner" />
    </div>
  );
};
