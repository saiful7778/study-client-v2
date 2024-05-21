import { cva } from "class-variance-authority";

const avatarVariants = cva(
  "relative flex size-10 shrink-0 overflow-hidden rounded-full",
  { variants: { size: { sm: "size-8", md: "size-10" } } },
);

export default avatarVariants;
