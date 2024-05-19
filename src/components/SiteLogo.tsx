import { FC } from "react";
import siteLogo from "@/assets/img/study-site-logo.png";
import cn from "@/lib/utils/cn";
import { Link } from "@tanstack/react-router";

interface SiteLogoProps {
  className?: string;
}

const SiteLogo: FC<SiteLogoProps> = ({ className }) => {
  return (
    <Link
      className={cn(
        "inline-flex items-center gap-1 text-2xl font-bold",
        className,
      )}
      to="/"
    >
      <img className="size-8" src={siteLogo} alt="site logo" />
      <div>
        <span className="text-blue-700">S</span>
        <span>tudy</span>
      </div>
    </Link>
  );
};

export default SiteLogo;
