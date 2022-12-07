import { useParams } from "react-router-dom";
import { BlogTemplates } from "../../config";
import { GridAuthor } from "./Author/NewGridAuthor";
import { BasicTemplate } from "./Author/TemplateAuthoring/BasicTemplate";

export const AdminBlogAuthor = () => {
  let { id = "" } = useParams();
  const templateName = BlogTemplates.find((t) => t.id === id)?.name;
  if (!templateName) return <p>{`Could not find template with id ${id}`}</p>;

  switch (templateName) {
    case "grid":
      return <GridAuthor></GridAuthor>;
    case "basic":
      return <BasicTemplate></BasicTemplate>;
    default:
      return <></>;
  }
};
