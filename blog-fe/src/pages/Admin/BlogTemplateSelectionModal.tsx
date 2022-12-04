import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BlogTemplate } from "../../types/template.types";

type AddBlogTemplateSelectionProps = {
  open: boolean;
  onClose: () => void;
  templates: BlogTemplate[];
};

const TemplateSelectionRow = ({ template }: { template: BlogTemplate }) => {
  return <Typography>{template.name}</Typography>;
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
            {
                templates.map(template => (
                    <>
                    <ListItem>
                        <ListItemButton onClick={() => {
                            navigate(`/admin/author/${template.id}`);
                        }}>
                            <ListItemIcon>
                                {template.icon}
                            </ListItemIcon>
                            <ListItemText>
                                {template.name}
                            </ListItemText>
                        </ListItemButton>
                        
                    </ListItem>
                    <Divider />
                    </>
                ))
            }
        </List>
        {/* <Grid container>
          {templates.map((template) => (
            <Grid item xs={12}>
              <TemplateSelectionRow template={template} />
            </Grid>
          ))}
        </Grid> */}
      </Box>
    </Modal>
  );
};
