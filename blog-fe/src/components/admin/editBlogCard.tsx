import {
  Card,
  Button,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import { SaveBlogResponse } from "../../types/api/admin";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";

type EditBlogCardProps = {
  blog: SaveBlogResponse;
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onPublish: () => void;
  onUnpublish: () => void;
};
export const EditBlogCard = ({
  blog,
  onEdit,
  onDelete,
  onPublish,
  onUnpublish,
}: EditBlogCardProps) => {
  const actions = [
    {
      icon: <EditIcon />,
      action: onEdit,
    },
    {
      icon: blog.published ? <TurnedInIcon /> : <TurnedInNotIcon />,
      action: blog.published ? onPublish : onUnpublish,
    },
    {
      icon: <DeleteIcon />,
      action: onDelete,
    },
  ];
  return (
    <Card>
      <CardActionArea>
        <CardContent>
          <Typography>{blog.title}</Typography>
          <Typography>
            Created: {new Date(blog.createdAt).toLocaleDateString("en-GB")}
          </Typography>
          {blog.updatedAt && (
            <Typography>
              Updated: {new Date(blog.updatedAt).toLocaleDateString("en-GB")}
            </Typography>
          )}
          {blog.publishDate && (
            <Typography>
              Published:{" "}
              {new Date(blog.publishDate).toLocaleDateString("en-GB")}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Grid container spacing={1} justifyContent={"flex-end"}>
          {actions.map((action, idx) => (
            <Grid item key={idx}>
              <IconButton size="small" onClick={action.action}>
                {action.icon}
              </IconButton>
            </Grid>
          ))}
        </Grid>
      </CardActions>
    </Card>
  );
};
