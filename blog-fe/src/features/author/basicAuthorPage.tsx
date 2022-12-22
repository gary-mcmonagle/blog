import { useState } from 'react'
import { BasicAuthor } from '../../components/admin/author/basic'
import { Template } from '../../types/api/admin'
import { AuthorBase } from './authorBase'
import { UpdateBlogMetadata } from './blogSaveModal'

export const BasicAuthorPage = ({ template, content: initalContent, updateBlogMetadata }: { template: Template, content?: any, updateBlogMetadata?: UpdateBlogMetadata }) => {
  const [content, setContent] = useState<string | null>(initalContent)
  return (
    <>
      <AuthorBase
       content={content} template={template} updateBlogMetadata={updateBlogMetadata} />
      <BasicAuthor
        startValue={content ?? ''}
        onChange={(e) => {
          setContent(e)
        }}
      ></BasicAuthor>
    </>
  )
}
