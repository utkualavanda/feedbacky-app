import { type ThemeOptions } from "@mui/material/styles/createTheme";

export const palette: ThemeOptions["palette"] = {
  mode: "light",

  primary: {
    main: "#f27a1a",
    light: "#f59548",
  },

  text: {
    disabled: "#a1a1a1",
    secondary: "#697488",
    primary: "#191919",
  },

  error: {
    main: "#ff3939",
  },
};
