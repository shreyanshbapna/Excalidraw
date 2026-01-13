import axios from "axios";
import { BACKEND_URL } from "@repo/secret/config";

export const getRoomId = async (slug: string): Promise<number> => {
  const response = await axios.get(`${BACKEND_URL}/room/${slug}`);
  return response.data.roomId;
};

export const getMessages = async (roomId: number): Promise<string[]> => {
  const response = await axios.get(`${BACKEND_URL}/chats/${roomId}`);
  // Extract only the message strings from objects
  return response.data.messages.map((m: { message: string }) => m.message);
};


