const express = require('express');
const cors = require('cors');


// Creating an instance of Express
const app = express();

// Cors
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

interface GameBoard {
  board: string[][];
}

let board: GameBoard = {
  board: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
}

app.get('/', (req, res) => {
  res.send(board);
});

app.post('/', (req, res) => {
  console.log("POST request received");
  console.log(req.body);
  board = req.body.board;
});

// Starting the server
const port = process.env.PORT || 3000; // Use the port provided by the environment or 3000 as default
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
