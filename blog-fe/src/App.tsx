import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import { AdminPage } from "./pages/AdminPage";
import { PageLayout } from "./components/PageLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "/admin",
    element: <AdminPage></AdminPage>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
