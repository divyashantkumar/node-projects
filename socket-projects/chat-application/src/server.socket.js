import { Server } from "socket.io";
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';



let io;

// io.on('connection', (uniqueSocket) => {
//     console.log('a user connected');
//     uniqueSocket.on('disconnect', () => {
//         console.log('user disconnected');
//     });
// });

// open the database file
const db = await open({
    filename: 'chat.db',
    driver: sqlite3.Database
});

// create our 'messages' table (you can ignore the 'client_offset' column for now)
await db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        client_offset TEXT UNIQUE,
        content TEXT
    );
  `);



function createSocket(httpServer) {
    io = new Server(httpServer, {
        connectionStateRecovery: {}
    });
}

export const initSocket = (httpServer) => {
    createSocket(httpServer);

    io.on('connection', (socket) => {
        console.log('a user connected', socket.id);

        socket.on('chat message', async (msg) => {
            let result;
            try {
                // store the message in the database
                result = await db.run('INSERT INTO messages (content) VALUES (?)', msg);
            } catch (e) {
                // TODO handle the failure
                return;
            }


            // include the offset with the message
            io.emit('chat message', msg, result.lastID);

            if (!socket.recovered) {
                // if the connection state recovery was not successful
                try {
                    await db.each('SELECT id, content FROM messages WHERE id > ?',
                        [socket.handshake.auth.serverOffset || 0],
                        (_err, row) => {
                            socket.emit('chat message', row.content, row.id);
                        }
                    )
                } catch (e) {
                    // something went wrong
                }
            }
        });

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });
};

export {
    io
}
