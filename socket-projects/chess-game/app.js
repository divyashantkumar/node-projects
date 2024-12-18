const express = require("express");
const http = require("http");
const path = require("path");
const socket = require("socket.io");
const { Chess } = require("chess.js");


const app = express();

const server = http.createServer(app);

const io = socket(server);

const chess = new Chess();

let players = {};
let currentPlayer = "W";


app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index", { title: "Chess Game" });
});


io.on("connection", (uniquesocket) => {
    console.log("A user connected");

    if(!players.white) {
        players.white = uniquesocket.id;
        uniquesocket.emit("playerRole", "w");
    } else if(!players.black) {
        players.black = uniquesocket.id;
        uniquesocket.emit("playerRole", "b");
    } else {
        players.white = uniquesocket.id;
        uniquesocket.emit("spectatorRole");
    }
    

    uniquesocket.on("disconnect", () => {
        if(uniquesocket.id === players.white) {
            players.white = null;
        } else if(uniquesocket.id === players.black) {
            players.black = null;        
        }
    });


    uniquesocket.on("move", (move) => {
        try {
            if(chess.turn() === "w" && players.white != uniquesocket.id)  return;
            if(chess.turn() === "b" && players.black != uniquesocket.id) return;

            const result = chess.move(move);

            if(result) {
                currentPlayer = chess.turn();
                io.emit("move", move);
                io.emit("boardState", chess.fen());
            } else {
                console.log("Invalid move : ", move);
                uniquesocket.emit("invalidMove", move);
            }
        } catch(e) {
            console.log(e);
            uniquesocket.emit("invalidMove", move);
        }
    });
});

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});

