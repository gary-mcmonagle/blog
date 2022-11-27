import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthPage } from "./pages/AuthPage";
import { AdminPage } from "./pages/AdminPage";
import { AdminBlogAuthor } from "./pages/Admin/AdminBlogAuthor";

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
  {
    path: "/admin/author/:id",
    element: <AdminBlogAuthor></AdminBlogAuthor>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

// xUy8Q~YtMIhzV0FP70W3aD2QiQoxHBLb-05E9a6y
