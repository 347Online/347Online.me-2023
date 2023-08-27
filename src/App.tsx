import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});
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
