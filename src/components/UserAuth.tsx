import { FC } from "react";
import Button from "@/components/ui/button";
import cn from "@/lib/utils/cn";
import useNavigatePage from "@/hooks/useNavigatePage";
import Avatar from "@/components/ui/avatar";
import DropdownMenu from "./ui/dropdown-menu";
import useAuth from "@/hooks/useAuth";
import useAuthInfo from "@/hooks/useAuthInfo";

interface UserAuthProps {
  className?: string;
}

const UserAuth: FC<UserAuthProps> = ({ className }) => {
  const { signOut } = useAuth();
  const { user } = useAuthInfo();
  const navigate = useNavigatePage();

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {user ? (
        <DropdownMenu>
          <DropdownMenu.trigger className="cursor-pointer" asChild>
            <Avatar size="sm">
              <Avatar.image
                src={user?.photoURL ?? undefined}
                alt="user image"
              />
              {user?.displayName && (
                <Avatar.fallback>{`${user?.displayName![0]}${user?.displayName![1]}`}</Avatar.fallback>
              )}
            </Avatar>
          </DropdownMenu.trigger>
          <DropdownMenu.content align="end">
            <div className="px-1 pt-1">
              <div className="text-sm leading-3">{user.displayName}</div>
              <div className="text-xs text-gray-500">{user.email}</div>
            </div>
            <DropdownMenu.separator />
            <DropdownMenu.item onClick={() => navigate("/dashboard")}>
              Dashboard
            </DropdownMenu.item>
            <DropdownMenu.item onClick={() => navigate("/profile")}>
              Profile
            </DropdownMenu.item>
            <DropdownMenu.separator />
            <DropdownMenu.item
              onClick={signOut}
              className="cursor-pointer justify-center bg-destructive"
            >
              Logout
            </DropdownMenu.item>
          </DropdownMenu.content>
        </DropdownMenu>
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
