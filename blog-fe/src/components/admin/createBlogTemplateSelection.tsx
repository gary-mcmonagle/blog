import { List, ListItem, ListItemButton } from "@mui/material";
import { TemplateResponse } from "../../types/api/admin";

export const CreateBlogTemplateSelection = ({
  templates,
  onClick,
}: {
  templates: TemplateResponse[];
  onClick: (template: TemplateResponse) => void;
}) => {
  return (
    <List>
      {templates.map((template) => (
        <ListItem divider>
          <ListItemButton
            onClick={() => {
              onClick(template);
            }}
          >
            {template.name}
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};
