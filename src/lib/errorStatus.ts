import { toast } from "@/hooks/useToast";

const errorStatus = (errorCode: Error) => {
  switch (errorCode.message) {
    case "Firebase: Error (auth/email-already-in-use).":
      toast({
        variant: "destructive",
        title: "This email is already in use! please login",
      });
      break;

    case "Firebase: Error (auth/email-already-exists).":
      toast({
        variant: "destructive",
        title: "This email is already exist! please login",
      });
      break;

    case "Firebase: Error (auth/insufficient-permission).":
      toast({
        variant: "destructive",
        title: "Permission is declined. Please retry.",
      });
      break;

    case "Firebase: Error (auth/invalid-credential).":
      toast({
        variant: "destructive",
        title: "Email or Password doesn't match",
      });
      break;

    default:
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
      });
      break;
  }
};
export default errorStatus;
