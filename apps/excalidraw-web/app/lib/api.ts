import axios from "axios";
import { BACKEND_URL } from "@repo/secret/config";

export const getRoomId = async (slug: string): Promise<number> => {
  const response = await axios.get(`${BACKEND_URL}/room/${slug}`);
  return response.data.roomId;
};

export async function getExistingShape(roomId: number) {
  const shapes = await axios.get(`${BACKEND_URL}/shapes/${roomId}`);
  return shapes.data.messages.map((s: { message: string }) => {
    return JSON.parse(s.message);
  });
}
