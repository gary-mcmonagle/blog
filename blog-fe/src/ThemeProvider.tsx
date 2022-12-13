import { createTheme } from "@mui/material";
import { green, grey, orange, purple, yellow } from "@mui/material/colors";
import { ThemeProvider as MuiThemeProvider } from "@mui/material";
import { DarkModeContext } from "./contexts/DarkModeContext";
import { useContext } from "react";

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

export const ThemeProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const { darkMode } = useContext(DarkModeContext) || {};

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};
