import ChatRoomClient from "../../../component/ChatRoomClient";
import { getMessages, getRoomId } from "../../lib/api";


export default async function ChatRoom({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const slug = (await params).slug;
  const roomId = await getRoomId(slug);
  const message = await getMessages(roomId);

  return (
    <div>
      <ChatRoomClient roomId={roomId} message={message} />
    </div>
  );
}
