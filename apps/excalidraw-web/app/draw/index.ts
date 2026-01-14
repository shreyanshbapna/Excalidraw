import { getExistingShape } from "../lib/api";

export type Shape =
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
    }
  | {
      type: "line";
      startX: number;
      startY: number;
      endX: number;
      endY: number;
    };

let existingShapes: Shape[] = [];

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
    // set stroke(bountry of shape to white color)
    ctx.strokeStyle = "rgba(255, 255, 255)";

    // for rectangle
    if (shape.type === "rect") {
      ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
    }
    // for circle
    else if (shape.type === "circle") {
      ctx.beginPath();
      ctx.arc(shape.centerX, shape.centerY, shape.radius, 0, 2 * Math.PI);
      ctx.stroke();
    }
    // for line
    else if (shape.type === "line") {
      ctx.beginPath();
      ctx.moveTo(shape.startX, shape.startY);
      ctx.lineTo(shape.endX, shape.endY);
      ctx.stroke();
    }
  });
}

export default async function initDraw(
  canvas: HTMLCanvasElement,
  roomId: number,
  socket: WebSocket,
  type: string
) {
  const ctx = canvas.getContext("2d");
  existingShapes = await getExistingShape(roomId);

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

  const handleMouseDown = (e: MouseEvent) => {
    clicked = true;
    InitialX = e.clientX;
    InitialY = e.clientY;
  };

  const handleMouseUp = (e: MouseEvent) => {
    clicked = false;

    let shape: Shape | undefined;

    if (type === "rect") {
      shape = {
        type: "rect",
        width: e.clientX - InitialX,
        height: e.clientY - InitialY,
        x: InitialX,
        y: InitialY,
      };
    } else if (type === "circle") {
      const radius =
        Math.sqrt(
          Math.pow(e.clientX - InitialX, 2) + Math.pow(e.clientY - InitialY, 2)
        ) / 2;

      shape = {
        type: "circle",
        centerX: (e.clientX + InitialX) / 2,
        centerY: (e.clientY + InitialY) / 2,
        radius: radius,
      };
    } else if (type === "line") {
      shape = {
        type: "line",
        startX: InitialX,
        startY: InitialY,
        endX: e.clientX,
        endY: e.clientY,
      };
    }

    if (shape) {
      socket.send(
        JSON.stringify({
          type: "chat",
          roomId,
          message: JSON.stringify(shape),
        })
      );
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (clicked) {
      clearCanvas(existingShapes, canvas, ctx);
      // set stroke(bountry of shape to white color)
      ctx.strokeStyle = "rgba(255, 255, 255)";

      // rectangle logic
      if (type === "rect") {
        ctx.strokeRect(
          InitialX,
          InitialY,
          e.clientX - InitialX,
          e.clientY - InitialY
        );
      }
      //  circle logic
      else if (type === "circle") {
        ctx.beginPath();
        const radius =
          Math.pow(
            Math.pow(e.clientX - InitialX, 2) +
              Math.pow(e.clientY - InitialY, 2),
            1 / 2
          ) / 2;
        ctx.arc(
          (e.clientX + InitialX) / 2,
          (e.clientY + InitialY) / 2,
          radius,
          0,
          2 * Math.PI
        );
        ctx.stroke();
      }
      // line logic
      else if (type === "line") {
        ctx.beginPath();
        ctx.moveTo(InitialX, InitialY);
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
      }
    }
  };
  canvas.addEventListener("mousedown", handleMouseDown);
  canvas.addEventListener("mouseup", handleMouseUp);
  canvas.addEventListener("mousemove", handleMouseMove);

  return () => {
    canvas.removeEventListener("mousedown", handleMouseDown);
    canvas.removeEventListener("mouseup", handleMouseUp);
    canvas.removeEventListener("mousemove", handleMouseMove);
  };
}
