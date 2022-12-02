import {
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
  AppBar,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledAppBar = styled(AppBar)({
  backgroundColor: "white",
});

export const SiteBar = () => (
  <Box sx={{ flexGrow: 1 }}>
    <StyledAppBar position="sticky">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, color: "black" }}
        >
          Gary McMonagle
        </Typography>
        <Button>Login</Button>
      </Toolbar>
    </StyledAppBar>
  </Box>
);
