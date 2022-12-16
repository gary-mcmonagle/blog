import {
  Card,
  Button,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
  Grid,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { SaveBlogResponse } from "../../types/api/admin";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import { useState } from "react";

type EditBlogCardProps = {
  blog: SaveBlogResponse;
  onClick: () => void;
  onEdit: () => Promise<boolean> | void;
  onDelete: () => Promise<boolean> | void;
  onPublish: () => Promise<boolean> | void;
  onUnpublish: () => Promise<boolean> | void;
};
export const EditBlogCard = ({
  blog,
  onEdit,
  onDelete,
  onPublish,
  onUnpublish,
  onClick
}: EditBlogCardProps) => {
  const [loading, setLoading] = useState<{ [k in ActionType]: boolean }>({
    publish: false,
    delete: false,
    edit: false,
  });
  const withLoading = (
    func: () => Promise<boolean> | void,
    actionType: ActionType
  ) => {
    return async () => {
      setLoading({ ...loading, [actionType]: true });
      await func();
      setLoading({ ...loading, [actionType]: false });
    };
  };
  enum ActionType {
    edit = "edit",
    publish = "publish",
    delete = "delete",
  }
  const actions = [
    {
      icon: <EditIcon />,
      action: onEdit,
      type: ActionType.edit,
    },
    {
      icon: blog.published ? <TurnedInIcon /> : <TurnedInNotIcon />,
      action: blog.published
        ? withLoading(onUnpublish, ActionType.publish)
        : withLoading(onPublish, ActionType.publish),
      type: ActionType.publish,
    },
    {
      icon: <DeleteIcon />,
      action: onDelete,
      type: ActionType.delete,
    },
  ];
  return (
    <Card>
      <CardActionArea onClick={onClick}>
        <CardContent>
          <Typography>{blog.title}</Typography>
          <Typography>
            Created: {new Date(blog.createdAt).toLocaleDateString("en-GB")}
          </Typography>
          <Typography>
            {blog.updatedAt
              ? `Updated ${new Date(blog.updatedAt).toLocaleDateString(
                  "en-GB"
                )}`
              : " "}
          </Typography>
          <Typography>
            {blog.publishDate
              ? `Published ${new Date(blog.publishDate).toLocaleDateString(
                  "en-GB"
                )}`
              : " "}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Grid container spacing={1} justifyContent={"flex-end"}>
          {actions.map((action, idx) => (
            <Grid item key={idx}>
              <IconButton
                disabled={loading[action.type]}
                size="small"
                onClick={() => action.action()}
              >
                {loading[action.type] ? (
                  <CircularProgress size={22} />
                ) : (
                  action.icon
                )}
              </IconButton>
            </Grid>
          ))}
        </Grid>
      </CardActions>
    </Card>
  );
};
