import { Box } from "@mui/material";
import { styled } from "@mui/system";

const Container = styled(Box)({
  padding: 5,
  fontFamily: '"Trebuchet MS", Helvetica, sans-serif',
});

export const BasicBlog = ({ content }: { content: string }) => {
  return (
    <Container>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </Container>
  );
};
