import express from 'express';
import Connection from './database/db.js';
import route from './routes/route.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Server } from 'socket.io';

const PORT = 8000;


const app = express();

app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));

app.use('/',route);

Connection();

const io = new Server(9000, {
    cors: {
        origin: 'http://localhost:3000',
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
    console.log('user connected')

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
    socket.on('typing', ({ senderId }) => {
        socket.broadcast.emit('typing', { senderId });
      });

    //disconnect
    socket.on('disconnect', () => {
        console.log('user disconnected');
        removeUser(socket.id);
        io.emit('getUsers', users);
    })
})


app.listen(PORT,()=>{console.log("server runner")})