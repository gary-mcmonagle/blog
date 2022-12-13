import * as React from "react";

export const DarkModeContext = React.createContext<{
  darkMode: boolean;
  setDarkMode: (d: boolean) => void;
} | null>(null);

export const DarkModeProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const systemPref =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [darkMode, setDarkMode] = React.useState<boolean>(systemPref);
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (event) => {
      const isDark = event.matches;
      setDarkMode(isDark);
    });
  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
