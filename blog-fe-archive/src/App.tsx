import "./App.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { AuthPage } from "./pages/AuthPage";
import { AdminPage } from "./pages/AdminPage";
import { AdminBlogAuthor } from "./pages/Admin/AdminBlogAuthor";
import { BlogPage } from "./pages/Blog/Blog";
import { SiteBar } from "./components/SiteBar";
import { Box } from "@mui/material";
import { height, styled } from "@mui/system";

const PageCotainer = styled(Box)({
  backgroundColor: "ghostwhite",
  height: "100vh",
});
const ContentCtainer = styled(Box)({
  marginLeft: "5vh",
  marginRight: "5vh",
  backgroundColor: "white",
  height: "90vh",
});

const Root = () => {
  return (
    <PageCotainer>
      <SiteBar />
      <ContentCtainer>
        <Outlet />
      </ContentCtainer>
    </PageCotainer>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "authExample",
        element: <AuthPage></AuthPage>,
      },
      {
        path: "admin",
        element: <AdminPage></AdminPage>,
      },
      {
        path: "admin/author/:id",
        element: <AdminBlogAuthor></AdminBlogAuthor>,
      },
      {
        path: "blog/:blogSlug",
        element: <BlogPage></BlogPage>,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

// xUy8Q~YtMIhzV0FP70W3aD2QiQoxHBLb-05E9a6y
