import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({});
const router = createBrowserRouter(routes);

export const App = () => (
  <>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </>
);
