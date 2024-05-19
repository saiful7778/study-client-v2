import {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";

interface StateContextProps {
  theme: string;
  handleTheme: (themeName: "light" | "dark" | "system") => void;
}

export const StateContext = createContext<StateContextProps>({
  theme: "system",
  handleTheme: () => {},
});

interface StateContextProviderProps {
  children: ReactNode;
}

const StateContextProvider: FC<StateContextProviderProps> = ({
  children,
  ...props
}) => {
  const [theme, setTheme] = useState<string>(
    localStorage.getItem("theme") || "system",
  );

  const handleThemeChange = useCallback(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
    if (theme === "system") {
      const systemTheme = prefersDarkMode.matches ? "dark" : "light";
      root.classList.add(systemTheme);
      return;
    }
    root.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    handleThemeChange();
  }, [theme, handleThemeChange]);

  useEffect(() => {
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
    prefersDarkMode.addEventListener("change", () => handleThemeChange());
    return () => {
      prefersDarkMode.removeEventListener("change", () => handleThemeChange());
    };
  }, [handleThemeChange]);

  const handleTheme = (themeName: "light" | "dark" | "system") => {
    localStorage.setItem("theme", themeName);
    setTheme(themeName);
  };

  return (
    <StateContext.Provider value={{ theme, handleTheme }} {...props}>
      {children}
    </StateContext.Provider>
  );
};

export default StateContextProvider;
