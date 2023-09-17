import createTheme from "@mui/material/styles/createTheme";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { breakpoints } from "../theme/breakpoints";
import { palette } from "../theme/palette";
import { ReactElement } from "react";
import { render } from "@testing-library/react";
import { ReactQueryWrapper } from "./ReactQueryWrapper";

const theme = createTheme({
  breakpoints,
  spacing: 4,
  palette,
});

const customRender = (ui: ReactElement) =>
  render(ui, {
    wrapper: () => (
      <ThemeProvider theme={theme}>
        <ReactQueryWrapper>{ui}</ReactQueryWrapper>
      </ThemeProvider>
    ),
  });

export * from "@testing-library/react";

export { customRender as render };
