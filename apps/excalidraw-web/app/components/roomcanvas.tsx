"use client";

import { useEffect, useState } from "react";
import { WS_URL } from "@repo/secret/config";
import { Canvas } from "./canvas";

export function RoomCanvas({
  roomId,
}: {
  roomId: number;
}) {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }
    const websocket = new WebSocket(`${WS_URL}/?token=${token}`);

    websocket.onopen = () => {
      setSocket(websocket);

      websocket.send(
        JSON.stringify({
          roomId,
          type: "join_room",
        })
      );
    };

    return () => {
      websocket.close();
    };
  }, [roomId]);

  if (!socket) {
    return <div>Connected to the Server.....</div>;
  }

  return (
    <div>
      {/* first stablish the connection with ws then render canvas */}
      <Canvas roomId={roomId} socket={socket} />
    </div>
  );
}
