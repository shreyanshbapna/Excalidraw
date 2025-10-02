import express, { Request, Response } from "express";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";

import { JWT_SECRET } from "@repo/common-backend/config"
import { middleware } from "./middleware";
import { createUserSchema, signinSchema , createRoomSchema} from "@repo/common/test"
import  prismaClient  from "@repo/db/client"

const app = express();
app.use(express.json());

app.post("/signup", async (req: Request, res: Response) => {

    const parseData = createUserSchema.safeParse(req.body);

    if(!parseData.success){
        return res.json({
            message: "Invalid Credentail!!",
            error: parseData.error
        })
    }

    const {email, name, password} = req.body;

    const hashpassword = await bcrypt.hash(password, 10);

    try {
        const response = await prismaClient.user.create({
            data: {
                email, 
                name, 
                password: hashpassword
            }
        });

        return res.json({
            response,
            message: "Signup successfully!!"
        })
    }
    catch(e) {
        return res.json({
            message: "Something went wrong!!",
            error: e
        })
    }
})

app.post("/signin", async (req: Request, res: Response) => {
    const data = signinSchema.safeParse(req.body);

    if(!data.success){
        return res.json({
            message: "Invalid Credentail!!",
            error: data.error
        })
    }

    const {email, password} = req.body;

    try {
        // check the user is registerd or not with this email
        const user = await prismaClient.user.findFirst({
            where: {
                email
            }
        });

        if(!user){
            return res.json({
                message: "User not found!!"
            })
        }

        // check the password is correct or not
        const checkpassword = await bcrypt.compare(password, user.password);

        if(!checkpassword){
            return res.json({
                message: "Invalid Credentail!!"
            })
        }

        const token = jwt.sign({
            id: user.id
        }, JWT_SECRET!);

        return res.json({
            token
        })

    } catch(e) {
        return res.json({
            message: "Something went wrong!!",
            error: e
        })
    }
})

app.post("/create-room", middleware, async(req: Request, res: Response) => {
    const data = createRoomSchema.safeParse(req.body);

    if(!data.success){
        return res.json({
            message: "Invalid Credentail!!",
            error: data.error
        })
    };

    const slug = req.body.name;
    // @ts-ignore
    const adminId = req.userId;

    try {
        const response = await prismaClient.room.create({
            data: {
                slug,
                adminId
            }
        });

        return res.json({
            roomId: response.id, 
            message: "Successfully Create the room"
        })

    } catch(e) {    
        return res.json({
            message: "Something went wrong!!",
            error: e
        })
    }
})

app.get("/chats/:room", middleware, (req: Request, res: Response) => {
    
})
app.listen(3001);