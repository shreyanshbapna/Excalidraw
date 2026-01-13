import { getExistingShape } from "../lib/api";

type Shape =
  | {
      type: "rect";
      x: number;
      y: number;
      height: number;
      width: number;
    }
  | {
      type: "circle";
      radius: number;
      centerX: number;
      centerY: number;
    };

function clearCanvas(
  existingShapes: Shape[],
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // black
  ctx.fillStyle = "rgba(0, 0, 0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  existingShapes.forEach((shape) => {
    if (shape.type === "rect") {
      ctx.strokeStyle = "rgba(255, 255, 255)";
      ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
    }
  });
}

export default async function initDraw(
  canvas: HTMLCanvasElement,
  roomId: number,
  socket: WebSocket
) {
  const ctx = canvas.getContext("2d");

  const existingShapes: Shape[] = await getExistingShape(roomId);

  if (!ctx) return;

  socket.onmessage = (event) => {
    const chats = JSON.parse(event.data);

    if (chats.type === "chat") {
      const shape = JSON.parse(chats.message);
      existingShapes.push(shape);
      clearCanvas(existingShapes, canvas, ctx);
    }
  };

  clearCanvas(existingShapes, canvas, ctx);

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

    const shape: Shape = {
      type: "rect",
      width: e.clientX - InitialX,
      height: e.clientY - InitialY,
      x: InitialX,
      y: InitialY,
    };

    socket.send(
      JSON.stringify({
        type: "chat",
        roomId,
        message: JSON.stringify(shape),
      })
    );
  });

  canvas.addEventListener("mousemove", (e) => {
    if (clicked) {
      clearCanvas(existingShapes, canvas, ctx);
      ctx.strokeStyle = "rgba(255, 255, 255)";
      ctx.strokeRect(
        InitialX,
        InitialY,
        e.clientX - InitialX,
        e.clientY - InitialY
      );
    }
  });
}
