import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { WebSocketProvider } from './hooks/WebSocketContext.tsx'
import 'bootstrap/dist/css/bootstrap.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WebSocketProvider>
      <App />
    </WebSocketProvider>
  </StrictMode>,
)
