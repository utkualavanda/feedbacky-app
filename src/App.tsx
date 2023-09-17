import createTheme from "@mui/material/styles/createTheme";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { breakpoints } from "./theme/breakpoints";
import { palette } from "./theme/palette";

function App() {
  const theme = createTheme({
    breakpoints,
    spacing: 4,
    palette,
  });

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
