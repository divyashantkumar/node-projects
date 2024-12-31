import { io } from "../server.socket.js";


export const sendMessage = (req, res) => {
    const { message } = req.body;
    io.emit('chat message', message);
    res.status(200).send('Message sent successfully');
}

export const getMessages = (req, res) => {
    res.status(200).send('Messages retrieved successfully');
}