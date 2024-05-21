import { forwardRef, ElementRef, ComponentPropsWithoutRef } from "react";
import { Root, Image, Fallback } from "@radix-ui/react-avatar";
import cn from "@/lib/utils/cn";
import avatarVariants from "@/lib/styles/avatar";
import { type VariantProps } from "class-variance-authority";

interface AvatarProps extends VariantProps<typeof avatarVariants> {}

const AvatarMain = forwardRef<
  ElementRef<typeof Root>,
  ComponentPropsWithoutRef<typeof Root> & AvatarProps
>(({ className, size = "md", ...props }, ref) => (
  <Root
    ref={ref}
    className={cn(avatarVariants({ size, className }))}
    {...props}
  />
));
AvatarMain.displayName = Root.displayName;

const AvatarImage = forwardRef<
  ElementRef<typeof Image>,
  ComponentPropsWithoutRef<typeof Image>
>(({ className, ...props }, ref) => (
  <Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));
AvatarImage.displayName = Image.displayName;

const AvatarFallback = forwardRef<
  ElementRef<typeof Fallback>,
  ComponentPropsWithoutRef<typeof Fallback>
>(({ className, ...props }, ref) => (
  <Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted text-sm",
      className,
    )}
    {...props}
  />
));
AvatarFallback.displayName = Fallback.displayName;

const Avatar = Object.assign(AvatarMain, {
  image: AvatarImage,
  fallback: AvatarFallback,
});

export default Avatar;
