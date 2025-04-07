// hooks/WebSocketContext.tsx
import React, { createContext, useContext, useEffect, useRef } from 'react';
import { AppConfig } from '../config';

console.log(AppConfig.roomId);

const WebSocketContext = createContext<React.MutableRefObject<WebSocket | null> | null>(null);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const hostname = window.location.hostname;
    socketRef.current = new WebSocket(`ws://${hostname}:8080/api/ws?room=${AppConfig.roomId}`);
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

export const useWS = () => {
  const context = useContext(WebSocketContext);
  if (!context) throw new Error("useWS must be used inside a WebSocketProvider");
  return context;
};
