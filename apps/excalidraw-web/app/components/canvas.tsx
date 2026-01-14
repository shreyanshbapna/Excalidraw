"use client";
import { useWindowSize } from "@uidotdev/usehooks";
import { useEffect, useRef, useState } from "react";
import initDraw from "../draw";
import { Circle, Minus, RectangleHorizontal } from "lucide-react";
export function Canvas({
  roomId,
  socket,
}: {
  roomId: number;
  socket: WebSocket;
}) {
  const { width, height } = useWindowSize();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [type, setType] = useState("");

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const cleanup = initDraw(canvas, roomId, socket, type);

      return () => {
        cleanup?.then((fn) => fn?.());
      };
    }
  }, [canvasRef, type]);

  return (
    <div className="h-screen overflow-hidden">
      <canvas
        ref={canvasRef}
        width={width ?? undefined}
        height={height ?? undefined}
        className="border border-black bg-black"
      ></canvas>

      <div className="absolute top-0 left-10 ">
        <button className=" mr-5" onClick={() => setType("rect")}>
          <RectangleHorizontal className={`border-2 border-white rounded-full p-1 cursor-pointer bg-black size-10 hover:bg-gray-600 text-${type==="rect"? "red-500": "white"}`} />
        </button>
        <button className="mr-5" onClick={() => setType("circle")}>
          <Circle className={`border-2 border-white rounded-full p-1 cursor-pointer bg-black size-10 hover:bg-gray-600 text-${type==="circle"? "red-500": "white"}`}/>
        </button>
        <button className="mr-5" onClick={() => setType("line")}>
          <Minus className={`border-2 border-white rounded-full p-1 cursor-pointer bg-black size-10 hover:bg-gray-600 text-${type==="line"? "red-500": "white"}`}/>
        </button>
      </div>
    </div>
  );
}
