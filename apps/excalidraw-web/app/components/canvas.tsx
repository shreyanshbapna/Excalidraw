"use client";
import { useWindowSize } from "@uidotdev/usehooks";
import { useEffect, useRef, useState } from "react";
import initDraw from "../draw";
import { Circle, Minus, RectangleHorizontal } from "lucide-react";
import { Game } from "../draw/game";
export function Canvas({
  roomId,
  socket,
}: {
  roomId: number;
  socket: WebSocket;
}) {
  const { width, height } = useWindowSize();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [game, setGame] = useState<Game>();

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const g = new Game(canvas, roomId, socket);
      setGame(g);

      return () => {
        g.destroy();
      };
    }
  }, [canvasRef]);

  return (
    <div className="h-screen overflow-hidden">
      <canvas
        ref={canvasRef}
        width={width ?? undefined}
        height={height ?? undefined}
        className="border border-black bg-black"
      ></canvas>

      <div className="absolute top-0 left-10 ">
        <button className=" mr-5" onClick={() => game?.setType("rect")}>
          <RectangleHorizontal
            className={
              "border-2 border-white rounded-full p-1 cursor-pointer size-10 hover:bg-gray-600 " +
              (game?.type === "rect" ? "text-red-500" : "text-white")
            }
          />
        </button>
        <button className="mr-5" onClick={() => game?.setType("circle")}>
          <Circle
            className={
              "border-2 border-white rounded-full p-1 cursor-pointer size-10 hover:bg-gray-600 " +
              (game?.type === "circle" ? "text-red-500" : "text-white")
            }
          />
        </button>
        <button className="mr-5" onClick={() => game?.setType("line")}>
          <Minus
            className={
              "border-2 border-white rounded-full p-1 cursor-pointer size-10 hover:bg-gray-600 " +
              (game?.type === "line" ? "text-red-500" : "text-white")
            }
          />
        </button>
      </div>
    </div>
  );
}
