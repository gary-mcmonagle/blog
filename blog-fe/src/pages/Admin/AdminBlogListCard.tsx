import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  styled,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Blog, CreatedBlog } from "../../types/template.types";
import { BasicBlog } from "../Blog/BasicBlog";
import EditIcon from '@mui/icons-material/Edit';
import { saveBlogToSession } from "../../utils/previewStorage";
type AdminBlogListCardProps = {
  blog: CreatedBlog;
};
const StyledCard = styled(Card)({
  // marginLeft: 10,
  // marginRight: 10
});
export const AdminBlogListCard = ({ blog }: AdminBlogListCardProps) => {
  const { urlSlug, title } = blog;
  const navigate = useNavigate();
  return (
    <StyledCard variant="outlined">
      <CardActionArea
        onClick={() => {
          navigate(`/blog/${urlSlug}`);
        }}
      >
        <CardContent>
          <Typography>{title}</Typography>
        </CardContent>
      </CardActionArea>
      <Button onClick={() => {
            saveBlogToSession({ ...blog, });
            navigate(`/admin/author/${blog.templateId}`);
        }}
        ><EditIcon></EditIcon></Button>
    </StyledCard>
  );
};
