import { Paper, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAllTemplates } from '../../api/adminApi'
import { BasicAuthorPage } from '../../features/author/basicAuthorPage'
import { TemplateResponse } from '../../types/api/admin'

export const Author = () => {
  const { templateName = '' } = useParams()
  const [templates, setTemplates] = useState<TemplateResponse[]>([])
  useEffect(() => {
    getAllTemplates().then((templates) => setTemplates(templates))
  }, [])

  const getTemplate = () => {
    const template = templates.find((t) => t.name === 'basic')
    if (template == null) {
      return
    }
    switch (templateName) {
      case 'basic':
        return <BasicAuthorPage template={template} />
      default:
        return <Typography>Not found</Typography>
    }
  }
  return <Paper style={{ minHeight: '100vh' }}>{getTemplate()}</Paper>
}
