import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthPage } from "./pages/AuthPage";
import { AdminPage } from "./pages/AdminPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "/authExample",
    element: <AuthPage></AuthPage>,
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


// xUy8Q~YtMIhzV0FP70W3aD2QiQoxHBLb-05E9a6y