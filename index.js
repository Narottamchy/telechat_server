import express from 'express';
import Connection from './database/db.js';
import route from './routes/route.js';
import cors from 'cors';
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import { Server } from 'socket.io';
dotenv.config();

const PORT = process.env.HOST_PORT || 8000;


const app = express();

app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));

app.use('/',route);

Connection();

const io = new Server(3000, {
    cors: {
        origin: `${process.env.CLIENT_SERVER}`,
    }, 
})


let users = [];

const addUser = (userData, socketId) => {
    !users.some(user => user.uid === userData.uid) && users.push({ ...userData, socketId });
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
}

const getUser = (userId) => {
    return users.find(user => user.uid === userId);
}

io.on('connection',  (socket) => {
    // console.log('user connected')

    //connect
    socket.on("addUsers", userData => {
        addUser(userData, socket.id);
        io.emit("getUsers", users);
    })

    //send message
    socket.on('sendMessage', (data) => {
        const user = getUser(data.receiverId);
        io.to(user.socketId).emit('getMessage', data)
    })

    // Handle typing event
    socket.on('typing', (data) => {
        // Broadcast the typing event to all connected clients except the sender
        socket.broadcast.emit('typing', data);
      });
    

    //disconnect
    socket.on('disconnect', () => {
        // console.log('user disconnected');
        removeUser(socket.id);
        io.emit('getUsers', users);
    })
})


app.listen(PORT)