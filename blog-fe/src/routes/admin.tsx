import { Paper } from "@mui/material";
import { BlogEditList } from "../features/admin/blogEditList";

export const Admin = () => {
  return (
    <Paper style={{ height: "100vh" }}>
      <BlogEditList />
    </Paper>
  );
};
