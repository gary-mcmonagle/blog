import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import { routes } from './routes'
import './App.css'
import { ThemeProvider } from './ThemeProvider'
import { DarkModeProvider } from './contexts/DarkModeContext'
import { SnackbarProvider } from './contexts/SnackbarProvider'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Outlet />
      </>
    ),
    children: routes
  }
])

const App = () => (
  <SnackbarProvider>
    <DarkModeProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </DarkModeProvider>
  </SnackbarProvider>
)

export default App
