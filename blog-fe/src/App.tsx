import React from 'react';
import logo from './logo.svg';
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { routes } from "./routes"
import './App.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <><Outlet/></>,
    children: routes
  }
]);

const App = () => <RouterProvider router={router} />

export default App;


