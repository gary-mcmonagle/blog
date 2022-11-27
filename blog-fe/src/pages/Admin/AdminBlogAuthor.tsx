import { useParams } from "react-router-dom";
import { BlogTemplates } from "../../config";
import { GridAuthor } from "./Author/GridAuthor";

export const AdminBlogAuthor = () => {
  let { id = "" } = useParams();
  const templateName = BlogTemplates.find((t) => t.id === id)?.name;
  if (!templateName) return <p>{`Could not find template with id ${id}`}</p>;

  switch (templateName) {
    case "grid":
      return <GridAuthor></GridAuthor>;
    default:
      return <></>;
  }
};
