import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './App.tsx'
import { RouterProvider } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
     
<ToastContainer
      autoClose={3000}
      theme="dark"
      position="top-right"
    />
  </StrictMode>
)
