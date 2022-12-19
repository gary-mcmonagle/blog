export const Basic = ({ content }: { content: string }) => {
  return <>{<div dangerouslySetInnerHTML={{ __html: content }}></div>}</>
}
