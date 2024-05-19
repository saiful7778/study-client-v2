import { DropDownProps } from "@/shared/Navbar";
import { Link } from "@tanstack/react-router";
import { FC } from "react";

interface NavbarDropDownProps {
  dropDownData: DropDownProps[] | undefined;
}

export const NavbarDropdown: FC<NavbarDropDownProps> = ({ dropDownData }) => {
  return (
    <ul className="invisible absolute right-0 top-full z-50 divide-y divide-border overflow-hidden whitespace-nowrap rounded-md border border-border bg-background opacity-0 shadow-lg duration-200 group-hover:visible group-hover:opacity-100">
      {dropDownData?.map((nav, idx) => (
        <DropdownItem
          key={"nav-dropdown-item-" + idx}
          className="inline-block w-full px-2 py-1.5 capitalize hover:bg-primary"
          path={nav.path}
          navName={nav.navName}
        />
      ))}
    </ul>
  );
};

export const NavbarMobileDropDown: FC<NavbarDropDownProps> = ({
  dropDownData,
}) => {
  return (
    <ul className="ml-4 space-y-1 divide-y divide-border">
      {dropDownData?.map((nav, idx) => (
        <DropdownItem
          key={"nav-dropdown-mobile-item-" + idx}
          path={nav.path}
          navName={nav.navName}
        />
      ))}
    </ul>
  );
};

interface DropdownItemProps {
  path: string;
  navName: string;
  className?: string;
}

const DropdownItem: FC<DropdownItemProps> = ({ className, path, navName }) => {
  return (
    <li>
      <Link className={className} to={path}>
        {navName}
      </Link>
    </li>
  );
};
