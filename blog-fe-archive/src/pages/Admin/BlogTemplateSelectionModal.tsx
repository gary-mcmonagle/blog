import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
} from "@mui/material";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BlogTemplate } from "../../types/template.types";
import { removeBlogFromSession } from "../../utils/previewStorage";

type AddBlogTemplateSelectionProps = {
  open: boolean;
  onClose: () => void;
  templates: BlogTemplate[];
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export const AddBlogTemplateSelectionModal = ({
  open,
  onClose,
  templates,
}: AddBlogTemplateSelectionProps) => {
  const navigate = useNavigate();
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <List>
          {templates.map((template) => (
            <>
              <ListItem>
                <ListItemButton
                  onClick={() => {
                    removeBlogFromSession()
                    navigate(`/admin/author/${template.id}`);
                  }}
                >
                  <ListItemIcon>{template.icon}</ListItemIcon>
                  <ListItemText>{template.name}</ListItemText>
                </ListItemButton>
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
      </Box>
    </Modal>
  );
};
