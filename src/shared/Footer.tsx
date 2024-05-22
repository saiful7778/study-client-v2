import { footerNavLinks } from "@/assets/staticData";
import SiteLogo from "@/components/SiteLogo";
import { Link } from "@tanstack/react-router";
import { FC } from "react";

const Footer: FC = () => {
  const date = new Date();
  return (
    <footer className="mt-20">
      <div className="mx-auto flex flex-col justify-between gap-4 px-2 py-10 max-sm:text-center md:w-4/5 md:flex-row">
        <div className="flex-1">
          <SiteLogo />
          <p className="text-sm">
            Elevate Your Education, Empower Your Future.
          </p>
        </div>
        <div>
          <div className="mb-2 text-xl font-bold">Links</div>
          <ul>
            {footerNavLinks.map((ele, idx) => (
              <li key={"footer-link-" + idx}>
                <Link className="link" to={ele.path}>
                  {ele.navName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="bg-muted p-4 text-center">
        © {date.getFullYear()} Study. All rights reserved by{" "}
        <Link className="btn-link" to="/">
          Saiful Islam
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
