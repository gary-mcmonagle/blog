import { useContext } from 'react'
import { SnackbarContext } from '../contexts/SnackbarProvider'

export const useSnackbar = () => {
  const {
    success: { setOpen: setSuccessOpen, setMessage }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  } = useContext(SnackbarContext)!

  return {
    success: (message?: string) => {
      setSuccessOpen(false)
      setMessage(message)
      setSuccessOpen(true)
    }
  }
}
