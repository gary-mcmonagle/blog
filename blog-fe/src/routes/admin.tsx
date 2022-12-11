import { Button, Paper, Popover, Typography } from "@mui/material";
import { BlogEditList } from "../features/admin/blogEditList";
import { AdminActionsBar } from "../features/admin/adminActionsBar";

export const Admin = () => {
  return (
    <Paper style={{ height: "100vh" }}>
      <div style={{ marginBottom: 20 }}>
        <AdminActionsBar />
      </div>
      <BlogEditList />
    </Paper>
  );
};
