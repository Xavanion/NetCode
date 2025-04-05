import { useEffect, useRef } from "react";

export const useWS = () => {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080/api/ws");
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("Connected");
      socket.send("Hello server!");
    };

    socket.onmessage = (event) => {
      console.log("Received:", event.data);
    };

    socket.onclose = () => {
      console.log("Disconnected");
    };

    return () => {
      socket.close();
    };
  }, []);

  return socketRef;
};
