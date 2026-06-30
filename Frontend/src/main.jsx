import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './app/App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1A1A2E',
            color: '#F1F1F3',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '12px',
            fontSize: '14px',
            fontFamily: "'Inter', sans-serif",
          },
          success: {
            iconTheme: {
              primary: '#22C55E',
              secondary: '#1A1A2E',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#1A1A2E',
            },
          },
        }}
      />
    </BrowserRouter>
  </StrictMode>,
)
