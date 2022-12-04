import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  styled,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Blog } from "../../types/template.types";
import { BasicBlog } from "../Blog/BasicBlog";

type AdminBlogListCardProps = {
  blog: Blog;
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
    </StyledCard>
  );
};
