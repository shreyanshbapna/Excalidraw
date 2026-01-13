import { RoomCanvas } from "@/app/components/roomcanvas";
import { getRoomId } from "@/app/lib/api";

export default async function Board({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const slug = (await params).slug;
  const roomId = await getRoomId(slug);
  return <div>
    <RoomCanvas roomId={roomId}/>
  </div>
}
