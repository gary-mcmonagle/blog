import { RouteObject } from "react-router-dom";
import { Author } from "./routes/admin/author"
export const routes: RouteObject[] = [
    {
        path: "admin/author",
        element: <Author></Author>
    }
]