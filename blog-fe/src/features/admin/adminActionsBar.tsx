import { Button, Popover, styled, Typography, Paper } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { TemplateResponse } from "../../types/api/admin";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { CreateBlogTemplateSelection } from "../../components/admin/createBlogTemplateSelection";
import { getAllTemplates } from "../../api/adminApi";
import { borderColor, Box } from "@mui/system";
import { grey, yellow } from "@mui/material/colors";
import { BorderStyle } from "@mui/icons-material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useNavigate } from "react-router-dom";

const ActionsContainer = styled(Box)({
  paddingLeft: 10,
  paddingBottom: 5,
  paddingTop: 5,
});

export const AdminActionsBar = () => {
  const [templates, setTemplates] = useState<TemplateResponse[]>([]);
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const createButtonRef = useRef<any>();
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const navigate = useNavigate();
  useEffect(() => {
    getAllTemplates().then((templates) => setTemplates(templates));
  }, []);
  return (
    <Paper elevation={2}>
      <ActionsContainer>
        <Button
          ref={createButtonRef}
          variant={"outlined"}
          onClick={() => {
            setCreateModalOpen(true);
            setAnchorEl(createButtonRef.current);
          }}
        >
          <AddCircleIcon />
          <ArrowDropDownIcon />
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
          <CreateBlogTemplateSelection
            templates={templates}
            onClick={(t) => navigate(`/admin/author/${t.name}`)}
          />
        </Popover>
      </ActionsContainer>
    </Paper>
  );
};
