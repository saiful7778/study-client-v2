import { FC } from "react";
import Button from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import cn from "@/lib/utils/cn";
import useNavigatePage from "@/hooks/useNavigatePage";
import Avatar from "@/components/ui/avatar";
import DropdownMenu from "./ui/dropdown-menu";
import { Link } from "@tanstack/react-router";

interface UserAuthProps {
  className?: string;
}

const UserAuth: FC<UserAuthProps> = ({ className }) => {
  const { user, singOut } = useAuth();
  const navigate = useNavigatePage();

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {user ? (
        <>
          {/* <Avatar size="sm">
            <Avatar.image src={user?.photoURL ?? undefined} alt="user image" />
            <Avatar.fallback>{`${user.displayName![0]}${user.displayName![1]}`}</Avatar.fallback>
          </Avatar>
          <Button onClick={singOut} size="sm">
            logout
          </Button> */}
          <DropdownMenu>
            <DropdownMenu.trigger className="cursor-pointer" asChild>
              <Avatar size="sm">
                <Avatar.image
                  src={user?.photoURL ?? undefined}
                  alt="user image"
                />
                <Avatar.fallback>{`${user.displayName![0]}${user.displayName![1]}`}</Avatar.fallback>
              </Avatar>
            </DropdownMenu.trigger>
            <DropdownMenu.content align="end">
              <div className="p-1">
                <div className="text-sm leading-3">{user.displayName}</div>
                <div className="text-xs text-gray-500">{user.email}</div>
              </div>
              <DropdownMenu.item>
                <Link className="block w-full">Dashboard</Link>
              </DropdownMenu.item>
              <Button className="w-full" onClick={singOut} size="sm">
                logout
              </Button>
            </DropdownMenu.content>
          </DropdownMenu>
        </>
      ) : (
        <>
          <Button onClick={() => navigate("/sign-in")} size="sm">
            Sign in
          </Button>
          <Button
            onClick={() => navigate("/sign-up")}
            size="sm"
            variant="outline"
          >
            Sign up
          </Button>
        </>
      )}
    </div>
  );
};

export default UserAuth;
