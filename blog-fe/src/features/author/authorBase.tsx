import { Fab, Paper } from "@mui/material";
import PreviewIcon from "@mui/icons-material/Preview";
import SaveIcon from "@mui/icons-material/Save";
import { BlogSaveModal } from "./blogSaveModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BlogContent } from "../../types/content";

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
  templateId: string | null;
};
export const AuthorBase = ({ content, templateId }: AuthorBaseProps) => {
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <Paper>
      <BlogSaveModal
        open={saveModalOpen}
        onClose={(redirectUrl) => {
          setSaveModalOpen(false);
          redirectUrl && navigate(redirectUrl);
        }}
        content={content || ""}
        templateId={templateId || ""}
      />
      <PreviewButton disabled={!content || !templateId} />
      <SaveButton
        disabled={!content || !templateId}
        onClick={() => {
          setSaveModalOpen(true);
        }}
      />
    </Paper>
  );
};
