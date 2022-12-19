import {
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  Typography
} from '@mui/material'
import { Modal } from '../../components/modal/modal'
import { TemplateResponse } from '../../types/api/admin'

export type CreateBlogModalProps = {
  open: boolean
  onClose: (redirectUrl?: string) => void
  templates: TemplateResponse[]
}
export const CreateBlogModal = (props: CreateBlogModalProps) => {
  const { templates } = props
  const isLoading = templates.length === 0
  return (
    <Modal {...props}>
      {isLoading
        ? (
        <CircularProgress />
          )
        : (
        <List>
          {templates.map((t) => (
            <ListItem divider>
              <ListItemButton>
                <Typography>{t.name}</Typography>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
          )}
    </Modal>
  )
}
