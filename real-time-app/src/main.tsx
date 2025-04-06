import 'bootstrap/dist/css/bootstrap.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { WebSocketProvider } from './hooks/WebSocketContext.tsx'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WebSocketProvider>
      <App />
    </WebSocketProvider>
  </StrictMode>,
)
