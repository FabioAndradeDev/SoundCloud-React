import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { AuthProvider } from './contexts/AuthContext'
import { MusicProvider } from './contexts/MusicContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <MusicProvider>
        <RouterProvider router={router} />
      </MusicProvider>
    </AuthProvider>
  </React.StrictMode>,
)
