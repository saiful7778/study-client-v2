import { Link } from "@tanstack/react-router";
import { FC, useState } from "react";
import SiteLogo from "@/components/SiteLogo";
import { navLinks } from "@/assets/staticData";
import { ChevronUp, SquareMenuIcon } from "lucide-react";
import cn from "@/lib/utils/cn";
import UserAuth from "@/components/UserAuth";
import {
  NavbarDropdown,
  NavbarMobileDropDown,
} from "@/components/NavbarDropdown";
import Button from "@/components/ui/button";
import ThemeChange from "@/components/ThemeChange";

const Navbar: FC = () => {
  const [mobileMenu, setMobileMenu] = useState<boolean>(false);

  const handleMobileMenu = () => setMobileMenu((prop) => !prop);

  return (
    <>
      <nav className="flex items-center gap-4">
        <SiteLogo className="flex-1" />
        <ul className="hidden md:flex md:items-center md:gap-4">
          {navLinks?.map((nav, idx) => (
            <NavLink
              key={"nav-item-" + idx}
              navName={nav.navName}
              path={nav.path}
              dropDown={nav?.dropDown}
              hasDropDown={nav?.hasDropDown}
            />
          ))}
        </ul>
        <ThemeChange />
        <UserAuth className="max-sm:hidden" />
        <Button onClick={handleMobileMenu} className="md:hidden" size="icon">
          <SquareMenuIcon size={20} />
        </Button>
      </nav>
      <nav
        className={cn(
          "fixed top-0 z-[110] h-screen w-full max-w-60 space-y-4 bg-background p-4 shadow backdrop-blur duration-300",
          mobileMenu ? "right-0" : "-right-full",
        )}
      >
        <Button onClick={handleMobileMenu} className="md:hidden" size="icon">
          <SquareMenuIcon size={20} />
        </Button>
        <ul className="space-y-1">
          {navLinks?.map((nav, idx) => (
            <li key={"nav-mobile-item-" + idx}>
              <Link className="font-medium capitalize" to={nav.path}>
                {nav.navName}
              </Link>
              {nav?.hasDropDown && (
                <NavbarMobileDropDown dropDownData={nav.dropDown} />
              )}
            </li>
          ))}
        </ul>
        <UserAuth />
      </nav>
    </>
  );
};

export interface DropDownProps {
  navName: string;
  path: string;
}

interface NavLinkProps {
  navName: string;
  path: string;
  hasDropDown?: boolean;
  dropDown?: DropDownProps[];
}

const NavLink: FC<NavLinkProps> = ({
  navName,
  path,
  hasDropDown,
  dropDown,
}) => {
  return (
    <li className={cn(hasDropDown && "group relative")}>
      <Link
        className="inline-flex items-center gap-2 font-medium capitalize"
        to={path}
      >
        {navName}
        {hasDropDown && (
          <div className="duration-300 group-hover:rotate-180">
            <ChevronUp />
          </div>
        )}
      </Link>
      {hasDropDown && <NavbarDropdown dropDownData={dropDown} />}
    </li>
  );
};

export default Navbar;
