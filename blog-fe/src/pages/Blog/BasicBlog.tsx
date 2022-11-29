export const BasicBlog = ({ content }: { content: string }) => {
  return <div dangerouslySetInnerHTML={{ __html: content }}></div>;
};
