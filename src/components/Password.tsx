import { useState, forwardRef } from "react";
import Input, { InputProps } from "./ui/input";
import { Eye, EyeOff } from "lucide-react";
import Button from "./ui/button";

const Password = forwardRef<HTMLDivElement, InputProps>(({ ...props }, ref) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div ref={ref} className="relative">
      <Input type={showPassword ? "text" : "password"} {...props} />
      <div className="absolute right-2 top-1/2 -translate-y-[45%]">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setShowPassword((prop) => !prop)}
          type="button"
        >
          {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
        </Button>
      </div>
    </div>
  );
});
Password.displayName = "Password";

export default Password;
