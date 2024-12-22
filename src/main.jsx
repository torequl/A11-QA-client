import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Route from './router/Route.jsx'
import { ToastContainer } from 'react-toastify'
import AuthProvider from './context/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={Route} />
      <ToastContainer position="top-center" autoClose={1500} />
    </AuthProvider>
  </StrictMode>,
)
