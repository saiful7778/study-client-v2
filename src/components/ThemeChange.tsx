import { FC } from "react";
import DropdownMenu from "@/components/ui/dropdown-menu";
import Button from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import useStateData from "@/hooks/useStateData";

const ThemeChange: FC = () => {
  const { handleTheme } = useStateData();
  return (
    <DropdownMenu>
      <DropdownMenu.trigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenu.trigger>
      <DropdownMenu.content align="end">
        <DropdownMenu.item onClick={() => handleTheme("dark")}>
          Dark
        </DropdownMenu.item>
        <DropdownMenu.item onClick={() => handleTheme("light")}>
          Light
        </DropdownMenu.item>
        <DropdownMenu.item onClick={() => handleTheme("system")}>
          System
        </DropdownMenu.item>
      </DropdownMenu.content>
    </DropdownMenu>
  );
};

export default ThemeChange;
