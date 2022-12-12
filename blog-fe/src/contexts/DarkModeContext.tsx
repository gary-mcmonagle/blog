import * as React from "react";

export const DarkModeContext = React.createContext<{
  darkMode: boolean;
  setDarkMode: (d: boolean) => void;
} | null>(null);

export const DarkModeProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [darkMode, setDarkMode] = React.useState<boolean>(false);
  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
