import z from "zod";

export const createUserSchema = z.object({
  name: z.string().min(2).max(35),
  email: z.string().email(),
  password: z.string().min(5).max(20),
});

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

export const createRoomSchema = z.object({
  name: z.string().min(3).max(30),
});

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
