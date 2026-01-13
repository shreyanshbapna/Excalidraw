"use client"
import { useEffect, useRef } from "react";
import initDraw from "../draw";
import { RectangleHorizontal } from "lucide-react";

export function Canvas({ roomId, socket }: { roomId: number, socket: WebSocket}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      initDraw(canvas, roomId, socket);
    }
  }, [canvasRef]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={4000}
        height={2000}
        className="border border-black bg-black"
      ></canvas>

      <div className="absolute top-0 left-0 ml-2">
        <button className="bg-amber-50 text-black">
          <RectangleHorizontal className="bg-black size-10 text-white" />
        </button>
        <button className="bg-amber-50 text-black p-3 m-2"> circle</button>
      </div>
    </div>
  );
}
