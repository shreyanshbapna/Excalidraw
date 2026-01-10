"use client";
import { useEffect, useRef } from "react";

export default function Board({ params }: { params: { slug: string } }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      let clicked = false;

      let InitialX = 0;
      let InitialY = 0;

      canvas.addEventListener("mousedown", (e) => {
        clicked = true;
        InitialX = e.clientX;
        InitialY = e.clientY;
      });

      canvas.addEventListener("mouseup", (e) => {
        clicked = false;
      });

      canvas.addEventListener("mousemove", (e) => {
        if(clicked) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeRect(InitialX, InitialY, e.clientX -  InitialX, e.clientY -  InitialY);
        }
      });

    }
  }, []);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        className="border border-black bg-red-50"
      ></canvas>
    </div>
  );
}
