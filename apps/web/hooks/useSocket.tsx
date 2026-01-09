import { WS_URL } from "@repo/secret/config";
import { useEffect, useState } from "react";

// this hook store the socket component
export function useSocket() {
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<WebSocket>();

  useEffect(() => {
    // check token is in localStorage or not
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    const ws = new WebSocket(`${WS_URL}?token=${token}`);

    ws.onopen = () => {
      setLoading(false); 
      setSocket(ws);
    };

  }, []);

  return { loading, socket };
}
