// hooks/WebSocketContext.tsx
import React, { createContext, useContext, useEffect, useRef } from "react";
import { AppConfig } from "@/config";

console.log(AppConfig.roomId);

/* 
  Create a WebSocket context using React Context API.
  This allows components across the app to access a shared WebSocket connection.
*/
const WebSocketContext =
  createContext<React.MutableRefObject<WebSocket | null> | null>(null);

/* 
  WebSocketProvider Component:
    Provides a WebSocket connection scoped to the room ID in AppConfig.
    Wrap your application with this provider to make the socket accessible via useWS().
  
  Responsibilities:
    - Initializes the WebSocket on mount
    - Logs connection/disconnection events
    - Closes the socket on unmount
    - Supplies the socket via context to children
*/
export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const hostname = window.location.hostname;
    const port = window.location.protocol === "https:" ? "" : ":9090";
    const url = `${protocol}//${hostname}${port}/api/ws?room=${AppConfig.roomId}`;
    socketRef.current = new WebSocket(url);

    socketRef.current.onopen = () => {
      console.log("Connected");
    };

    socketRef.current.onclose = () => {
      console.log("Disconnected");
    };

    return () => {
      socketRef.current?.close();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={socketRef}>
      {children}
    </WebSocketContext.Provider>
  );
};

/* 
  useWS Hook:
    Custom hook to access the shared WebSocket instance.
    Throws an error if used outside of a WebSocketProvider.
*/
export const useWS = () => {
  const context = useContext(WebSocketContext);
  if (!context)
    throw new Error("useWS must be used inside a WebSocketProvider");
  return context;
};
