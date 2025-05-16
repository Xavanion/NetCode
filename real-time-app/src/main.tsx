import "@/main.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { WebSocketProvider } from "@/hooks/WebSocketContext.tsx";
import App from "@/App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WebSocketProvider>
      {/* WebSocketContext to allow for all components in the app to call to the same websocket */}
      <App />
    </WebSocketProvider>
  </StrictMode>
);
