import { AddBlogTemplateSelection } from "../components/Admin/AddBlogTemplateSelection";
import { BlogTemplates } from "../config";

export const AdminPage = () => {
  return (
    <AddBlogTemplateSelection
      templates={BlogTemplates}
    ></AddBlogTemplateSelection>
  );
};
