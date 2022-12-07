import { Fab } from "@mui/material";
import PreviewIcon from "@mui/icons-material/Preview";

export const PreviewButton = ({ onClick }: { onClick?: () => void }) => (
  <Fab
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
