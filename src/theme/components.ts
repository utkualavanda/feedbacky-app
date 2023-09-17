import { type Theme } from "@mui/material/styles/createTheme";

export const components = (): Theme["components"] => ({
  MuiCssBaseline: {
    styleOverrides: {
      html: {
        fontSize: "10px",
      },
      body: {
        fontSize: "1.4rem",
      },
    },
  },
});
