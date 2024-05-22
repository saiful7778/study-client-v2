import { dashboardLinks } from "@/assets/staticData";
import { Link } from "@tanstack/react-router";
import { FC } from "react";

const Sidebar: FC = () => {
  return (
    <aside className="w-full max-w-40">
      <nav
        className="flex flex-col gap-4 text-sm text-muted-foreground"
        x-chunk="dashboard-04-chunk-0"
      >
        {dashboardLinks.map((ele, idx) => (
          <Link
            key={"dashboard-link" + idx}
            to={ele.path}
            activeProps={{ className: "font-semibold text-primary" }}
          >
            {ele.navName}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
