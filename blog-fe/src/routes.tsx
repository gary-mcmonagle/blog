import { RouteObject } from "react-router-dom";
import { Admin } from "./routes/admin";
import { Author } from "./routes/admin/author";
export const routes: RouteObject[] = [
  {
    path: "admin/author",
    element: <Author></Author>,
  },
  {
    path: "admin",
    element: <Admin></Admin>,
  },
];
