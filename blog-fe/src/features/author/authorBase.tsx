import { Fab, Paper } from "@mui/material";
import PreviewIcon from "@mui/icons-material/Preview";
import SaveIcon from "@mui/icons-material/Save";
import { BlogSaveModal } from "./blogSaveModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BlogContent } from "../../types/content";
import { Template } from "../../types/api/admin";
import { useSnackbar } from "../../hooks/useSnackbar";

const PreviewButton = ({
  onClick,
  disabled,
}: {
  onClick?: () => void;
  disabled?: boolean;
}) => (
  <Fab
    disabled={disabled}
    onClick={onClick}
    style={{
      margin: 0,
      top: "auto",
      right: 85,
      bottom: 20,
      left: "auto",
      position: "fixed",
    }}
  >
    <PreviewIcon />
  </Fab>
);
const SaveButton = ({
  onClick,
  disabled,
}: {
  onClick?: () => void;
  disabled?: boolean;
}) => (
  <Fab
    disabled={disabled}
    onClick={onClick}
    style={{
      margin: 0,
      top: "auto",
      right: 20,
      bottom: 20,
      left: "auto",
      position: "fixed",
    }}
  >
    <SaveIcon />
  </Fab>
);

type AuthorBaseProps = {
  content: BlogContent | null;
  template: Template;
};
export const AuthorBase = ({ content, template }: AuthorBaseProps) => {
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const navigate = useNavigate();
  const { success } = useSnackbar();
  return (
    <Paper>
      <BlogSaveModal
        open={saveModalOpen}
        onClose={(redirectUrl) => {
          setSaveModalOpen(false);
          redirectUrl && navigate(redirectUrl);
          success("Blog saved!");
        }}
        content={content || ""}
        template={template}
      />
      <PreviewButton disabled={!content} />
      <SaveButton
        disabled={!content}
        onClick={() => {
          setSaveModalOpen(true);
        }}
      />
    </Paper>
  );
};
