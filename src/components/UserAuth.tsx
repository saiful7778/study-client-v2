import { FC } from "react";
import Button from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import cn from "@/lib/utils/cn";
import useNavigatePage from "@/hooks/useNavigatePage";

interface UserAuthProps {
  className?: string;
}

const UserAuth: FC<UserAuthProps> = ({ className }) => {
  const { user, logOut } = useAuth();
  const navigate = useNavigatePage();

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {user ? (
        <>
          <div className="avatar placeholder online">
            <div className="h-8 w-8 rounded-full bg-white ring-2 ring-primary ring-offset-2 ring-offset-gray-100">
              {user?.photoURL ? (
                <img src={user?.photoURL} alt="user image" />
              ) : (
                <span className="text-xl font-semibold uppercase">
                  {user?.displayName}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={logOut}
            className="btn btn-sm btn-primary btn-outline"
            type="button"
          >
            logout
          </button>
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
