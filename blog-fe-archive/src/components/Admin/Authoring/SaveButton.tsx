import { Fab } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

export const SaveButton = ({ onClick }: { onClick?: () => void }) => (
  <Fab
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
