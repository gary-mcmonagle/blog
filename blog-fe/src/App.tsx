import React from "react";
import logo from "./logo.svg";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import "./App.css";
import { theme } from "./theme";
import { ThemeProvider } from "./ThemeProvider";
import { DarkModeProvider } from "./contexts/DarkModeContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Outlet />
      </>
    ),
    children: routes,
  },
]);

const App = () => (
  <DarkModeProvider>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </DarkModeProvider>
);

export default App;
