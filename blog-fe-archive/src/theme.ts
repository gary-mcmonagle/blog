import { createTheme } from "@mui/material";
import { green, purple, yellow } from "@mui/material/colors";

export const theme = createTheme({
    palette: {
      primary: {
        main: purple[500],
        dark: yellow[500]
      },
      secondary: {
        main: green[500],
      },
    },
  });

