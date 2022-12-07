import { Box, Card, CardActionArea, CardContent, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BlogTemplate } from "../../types/template.types";

type AddBlogTemplateSelectionProps = {
  templates: BlogTemplate[];
};

const TemplateSelect = (template: BlogTemplate, redirect: () => void) => (
  <Card>
    <CardActionArea onClick={redirect}>
      <CardContent>
        <p>{template.name}</p>
      </CardContent>
    </CardActionArea>
  </Card>
);

export const AddBlogTemplateSelection = ({
  templates,
}: AddBlogTemplateSelectionProps) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {templates.map((t) => (
          <Grid item xs={3}>
            {TemplateSelect(t, () => {
              navigate(`/admin/author/${t.id}`);
            })}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
