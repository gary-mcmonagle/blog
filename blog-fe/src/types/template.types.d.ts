export type BlogTemplate = {
  name: string;
  id: string;
  icon: JSX.Element;
};

export type Blog = {
  templateId: string;
  content: any;
  urlSlug: string;
  title: string;
};

export type BlogMetadata = {
  id: string
  urlSlug: string;
  title: string;
}

export type CreatedBlog = Blog & {
  id: string
}