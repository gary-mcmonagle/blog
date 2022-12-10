import { Button, Paper, Popover, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { getAllTemplates } from "../api/adminApi";
import { CreateBlogTemplateSelection } from "../components/admin/createBlogTemplateSelection";
import { BlogEditList } from "../features/admin/blogEditList";
import { CreateBlogModal } from "../features/admin/createBlogModal";
import { TemplateResponse } from "../types/api/admin";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export const Admin = () => {
  const [templates, setTemplates] = useState<TemplateResponse[]>([]);
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const createButtonRef = useRef<any>();
  const [anchorEl, setAnchorEl] = useState<any>(null);
  useEffect(() => {
    getAllTemplates().then((templates) => setTemplates(templates));
  }, []);
  return (
    <Paper style={{ height: "100vh" }}>
      {/* <CreateBlogModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        templates={templates}
      /> */}
      <Button
        ref={createButtonRef}
        variant={"outlined"}
        onClick={() => {
          setCreateModalOpen(true);
          setAnchorEl(createButtonRef.current);
        }}
      >
        <Typography>
        Create
        </Typography>
        <ArrowDropDownIcon/>
      </Button>
      <Popover
        open={createModalOpen}
        anchorEl={anchorEl}
        onClose={() => {
          setCreateModalOpen(false);
          setAnchorEl(null);
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <CreateBlogTemplateSelection templates={templates} onClick={(t) => console.log({t})} />
      </Popover>
      <BlogEditList />
    </Paper>
  );
};
