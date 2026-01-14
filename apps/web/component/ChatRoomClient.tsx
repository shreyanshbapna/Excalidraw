"use client";

import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";

export default function ChatRoomClient({
  message,
  roomId,
}: {
  message: string[];
  roomId: number;
}) {
  const [chats, setChats] = useState(message);
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const { loading, socket } = useSocket();

  useEffect(() => {
    if (socket && !loading) { 

      socket.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);

        if (parsedData.type === "chat") {
          setChats((c) => [...c, parsedData.message]);
        }
      };
    }
  }, [socket, loading, roomId]);

  return (
    <div>
      {chats.map((m, index) => (
        <div key={index}>{m}</div>
      ))}

      <input
        type="text"
        placeholder="Message"
        value={currentMessage}
        onChange={(e) => setCurrentMessage(e.target.value)}
      />
      <button
        onClick={() => {
          socket?.send(
            JSON.stringify({
              type: "chat",
              roomId,
              message: currentMessage,
            })
          );
          setCurrentMessage("");
        }}
      >
        {" "}
        Send Message{" "}
      </button>
    </div>
  );
}
