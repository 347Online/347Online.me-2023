import { CssBaseline, ThemeProvider } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import { theme } from "./theme";

const router = createBrowserRouter(routes);

export const App = () => (
  <>
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme>
        <RouterProvider router={router} />
      </CssBaseline>
    </ThemeProvider>
  </>
);
