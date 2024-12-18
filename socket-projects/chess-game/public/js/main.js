
const  socket = io();
const chess = new Chess();

const boardElement = document.querySelector(".chessboard");

let draggedPiece = null;
let sourceSquare = null;
let playerRole = null;

const renderBoard = () => {
    const board = chess.board();
    boardElement.innerHTML = "";

    board.forEach((row, rowIndex) => {    
        row.forEach((square, columnIndex) => {
            const squareElement = document.createElement("div");
            squareElement.classList.add("square", (columnIndex + rowIndex) % 2 === 0 ? "light" : "dark");    
            
            squareElement.dataset.row = rowIndex;
            squareElement.dataset.column = columnIndex;

            if(square) {    
                const pieceElement = document.createElement("div");
                pieceElement.classList.add("piece", square.color === 'w' ? "white" : "black");
                
                pieceElement.innerText = getPieceUnicode(square);    
                pieceElement.draggable = playerRole === square.color;

                pieceElement.addEventListener("dragstart", (e) => {
                    e.dataTransfer.setData("text/plain", "");
                    if(pieceElement.draggable) {
                        draggedPiece = pieceElement;
                        sourceSquare = { row: rowIndex, column: columnIndex };
                    }
                })
                
                pieceElement.addEventListener("dragend", (e) => {
                    draggedPiece = null;
                    sourceSquare = null;
                })

                squareElement.appendChild(pieceElement);
            }

            squareElement.addEventListener("dragover", (e) => {
                e.preventDefault();
            })

            squareElement.addEventListener("drop", (e) => {
                e.preventDefault();
                if(draggedPiece) {
                    const targetSquare = { 
                        row: parseInt(e.target.dataset.row), 
                        column: parseInt(e.target.dataset.column) 
                    };
                    
                    handleMove(sourceSquare, targetSquare);
                }
            })
            boardElement.appendChild(squareElement);
        });        
    });

    if(playerRole === "b")  {
        boardElement.classList.add("flipped");
    } else {
        boardElement.classList.remove("flipped");
    }
}

const handleMove = (sourceSquare, targetSquare) => {
    const move = {
        from: `${String.fromCharCode(sourceSquare.column + 97)}${8 - sourceSquare.row}`,  
        to: `${String.fromCharCode(targetSquare.column + 97)}${8 - targetSquare.row}`,
        promotion: 'q'
    }

    socket.emit("move", move);
}

const getPieceUnicode = (piece) => {
    const unicodePieces = {
        p: "\u2659",
        n: "\u2658",
        b: "\u2657",
        r: "\u2656",
        q: "\u2655",
        k: "\u2654",
        P: "\u265F",
        N: "\u265E",
        B: "\u265D",
        R: "\u265C",
        Q: "\u265B",
        K: "\u265A",
    }; 

    return unicodePieces[piece.type] || "";
}

socket.on("playerRole", (role) => {
    playerRole = role;
    renderBoard();
});

socket.on("spectatorRole", () => {
    playerRole = null;
    renderBoard();
})


socket.on("boardState", (fen) => {
    chess.load(fen);
    renderBoard();
})

socket.on("move", (move) => {
    chess.move(move);
    renderBoard();
})

renderBoard();
