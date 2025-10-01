import { JWT_SECRET } from "@repo/common-backend/config"
import { WebSocket, WebSocketServer } from 'ws';
import jwt from "jsonwebtoken";

const wss = new WebSocketServer({ port: 8080 });

const checkUser = (token: string): string | null => {
    const decode = jwt.verify(token, JWT_SECRET);
    
    if(typeof decode == "string") {
        return null; 
    }
    
    if (!decode || decode.id){
        return null;
    }

    return decode.id as string;
};

interface User {
    ws: WebSocket,
    rooms: string[],
    userId: string
}

const users: User[] = [];

wss.on('connection', function connection(ws) {
    
    ws.on("connection", function (ws, request){
        const url = request.url;

        if(!url) {
            ws.close();
            return;
        }

        const queryParams = new URLSearchParams(url.split("?")[1]);
        const token = queryParams.get("token");

        if (!token){
            ws.close();
            return;
        }

        const userId = checkUser(token);

        if(!userId){
            ws.close();
            return;
        }


        users.push({
            userId,
            rooms: [],
            ws
        });

    })

    ws.on('message', function message(data) {
        const parseData = JSON.parse(data as unknown as string);    

        if(parseData.type === "join_room"){
            const user = users.find(x => x.ws === ws);
            user?.rooms.push(parseData.roomId);
        }

        if(parseData.type === "leave_room"){
            const user = users.find(x => x.ws === ws);
            if(!user) return;
            user.rooms = user.rooms.filter(x => x !== parseData.roomId);
        }

        if(parseData.type === "chat"){
            const roomId = parseData.roomId;
            const message = parseData.message;
            
            users.forEach(user => {
                if(user.rooms.includes(roomId)){
                    user.ws.send(JSON.stringify({
                        type: "chat",
                        message: message,
                        roomId
                    }))
                
                }
            })    
        }
    });
  
});