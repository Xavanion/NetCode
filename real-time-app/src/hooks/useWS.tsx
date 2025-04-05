import { useEffect, useRef } from "react";

export const useWS = () => {
  const socketRef = useRef<WebSocket | null>(null);
  useEffect(() => {
    socketRef.current = new WebSocket("ws://localhost:8080/api/ws");
    socketRef.current.onopen = () => {
      console.log("Connected");
      socketRef.current?.send("Hello server!");
    };
    socketRef.current.onmessage = (event) => {
      console.log("Received:", event.data);
    };
    socketRef.current.onclose = () => {
      console.log("Disconnected");
    };
    return () => {
      socketRef.current?.close();
    };
  }, []);

  return socketRef;
};
