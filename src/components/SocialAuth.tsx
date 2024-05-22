import cn from "@/lib/utils/cn";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { FC } from "react";
import { useAxios } from "@/hooks/useAxios";
import { toast } from "@/hooks/useToast";
import useNavigatePage from "@/hooks/useNavigatePage";
import errorStatus from "@/lib/errorStatus";
import { SeparatorWithText } from "./ui/separator";
import useAuth from "@/hooks/useAuth";

const style = {
  base: "border rounded shadow-sm flex flex-1 items-center active:focus:scale-95 text-lg font-bold gap-2 p-2 justify-center",
};

const SocialAuth: FC = () => {
  const { googleAuth } = useAuth();
  const axios = useAxios();
  const navigate = useNavigatePage();

  const handleGoogleAuth = async (): Promise<void> => {
    try {
      const { user } = await googleAuth();
      await axios.post("/user/oauth", {
        userName: user.displayName,
        userEmail: user.email,
        userToken: user.uid,
        userPhoto: user.photoURL,
      });
      toast({
        title: `Sign up successfully!`,
        description: `'${user.email}' account is created.`,
      });
      navigate("/dashboard");
    } catch (err) {
      if (err instanceof Error) {
        errorStatus(err);
      }
    }
  };

  const handleFacebookAuth = async (): Promise<void> => {
    toast({
      variant: "destructive",
      title: "Unavailable",
      description: "Facebook authentication is currently unavailable",
    });
  };

  return (
    <>
      <SeparatorWithText text="Or continue with" />
      <div className="my-2 flex flex-col justify-center gap-2 md:flex-row">
        <button
          onClick={handleGoogleAuth}
          className={cn(style.base, "border-green-500 text-green-500")}
          type="button"
        >
          <FaGoogle />
          Google
        </button>
        <button
          onClick={handleFacebookAuth}
          className={cn(style.base, "border-sky-600 text-sky-600")}
          type="button"
        >
          <FaFacebook />
          Facebook
        </button>
      </div>
    </>
  );
};

export default SocialAuth;
