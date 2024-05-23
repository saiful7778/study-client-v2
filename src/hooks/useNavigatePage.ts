import { FileRoutesByPath, useNavigate } from "@tanstack/react-router";

export type ExtractPaths<T> = T extends { [K in keyof T]: { path: infer P } }
  ? P extends ""
    ? never
    : P
  : never;

export default function useNavigatePage() {
  const navigate = useNavigate();

  return async (link: ExtractPaths<FileRoutesByPath>) => {
    await navigate({ to: link });
  };
}
