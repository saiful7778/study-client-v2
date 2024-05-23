import { dashboardLinks } from "@/assets/staticData";
import Button from "@/components/ui/button";
import DropdownMenu from "@/components/ui/dropdown-menu";
import { SquareMenuIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { FC } from "react";
import useNavigatePage from "@/hooks/useNavigatePage";
import cn from "@/lib/utils/cn";
import { buttonVariants } from "@/lib/styles";

const Sidebar: FC = () => {
  const navigate = useNavigatePage();
  return (
    <aside className="w-full max-w-40">
      <div className="flex-1 md:hidden">
        <DropdownMenu>
          <DropdownMenu.trigger asChild>
            <Button variant="outline" size="icon">
              <SquareMenuIcon size={20} />
              <span className="sr-only">sidebar menu</span>
            </Button>
          </DropdownMenu.trigger>
          <DropdownMenu.content align="end">
            {dashboardLinks.map((ele, idx) => (
              <DropdownMenu.item
                key={"dashboard-menu-link" + idx}
                onClick={() => navigate(ele.path)}
              >
                {ele.navName}
              </DropdownMenu.item>
            ))}
          </DropdownMenu.content>
        </DropdownMenu>
      </div>
      <nav
        className="flex flex-col gap-2 text-sm text-muted-foreground max-md:hidden"
        x-chunk="dashboard-04-chunk-0"
      >
        {dashboardLinks.map((ele, idx) => (
          <Link
            key={"dashboard-link" + idx}
            to={ele.path}
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "justify-start",
            )}
            activeProps={{ className: "bg-muted hover:bg-muted" }}
          >
            {ele.navName}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
