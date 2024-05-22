import { forwardRef, ElementRef, ComponentPropsWithoutRef } from "react";
import { Root } from "@radix-ui/react-separator";
import cn from "@/lib/utils/cn";

const Separator = forwardRef<
  ElementRef<typeof Root>,
  ComponentPropsWithoutRef<typeof Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref,
  ) => (
    <Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className,
      )}
      {...props}
    />
  ),
);
Separator.displayName = Root.displayName;

interface SeparatorWithTextProps {
  text: string;
}

export const SeparatorWithText = forwardRef<
  ElementRef<typeof Root>,
  ComponentPropsWithoutRef<typeof Root> & SeparatorWithTextProps
>(({ text }, ref) => (
  <div className="relative my-2" ref={ref}>
    <div className="absolute inset-0 flex items-center">
      <span className="w-full border-t" />
    </div>
    <div className="relative flex justify-center text-xs uppercase">
      <span className="bg-background px-2 text-muted-foreground">{text}</span>
    </div>
  </div>
));

export default Separator;
