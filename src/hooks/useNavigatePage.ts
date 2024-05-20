import { FileRoutesByPath, useNavigate } from "@tanstack/react-router";

type FileRoutePaths = keyof FileRoutesByPath;

export default function useNavigatePage() {
  const navigate = useNavigate();

  return async (link: FileRoutePaths) => {
    await navigate({ to: link });
  };
}
