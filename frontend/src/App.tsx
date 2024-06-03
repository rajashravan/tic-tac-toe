import { useState, useEffect } from "react";
import "./App.css";

interface GameBoard {
  board: string[][];
}

function App() {
  const [currentPlayer, setCurrentPlayer] = useState("x");

  // represent the game board as a array of arrays
  const [gameBoard, setGameBoard] = useState<GameBoard>({
    board: [
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "],
    ],
  });

  function checkWinner(): string | null {
    // check rows
    for (let i = 0; i < 3; i++) {
      if (
        gameBoard.board[i][0] === gameBoard.board[i][1] &&
        gameBoard.board[i][0] === gameBoard.board[i][2] &&
        gameBoard.board[i][0] !== " "
      ) {
        console.log("winner is " + gameBoard.board[i][0]);
        return gameBoard.board[i][0];
      }
    }

    // check columns
    for (let i = 0; i < 3; i++) {
      if (
        gameBoard.board[0][i] === gameBoard.board[1][i] &&
        gameBoard.board[0][i] === gameBoard.board[2][i] &&
        gameBoard.board[0][i] !== " "
      ) {
        console.log("winner is " + gameBoard.board[0][i]);
        return gameBoard.board[0][i];
      }
    }

    // check diagonals
    if (
      gameBoard.board[0][0] === gameBoard.board[1][1] &&
      gameBoard.board[0][0] === gameBoard.board[2][2] &&
      gameBoard.board[0][0] !== " "
    ) {
      console.log("winner is " + gameBoard.board[0][0]);
      return gameBoard.board[0][0];
    }

    if (
      gameBoard.board[0][2] === gameBoard.board[1][1] &&
      gameBoard.board[0][2] === gameBoard.board[2][0] &&
      gameBoard.board[0][2] !== " "
    ) {
      console.log("winner is " + gameBoard.board[0][2]);
      return gameBoard.board[0][2];
    }

    return null;
  }

  useEffect(() => {
    checkWinner();
  }, [gameBoard]); // run checkWinner whenever gameBoard changes

  function setBoardCell(row: number, col: number) {
    // create a new copy of the board
    const newBoard = JSON.parse(JSON.stringify(gameBoard.board));
    newBoard[row][col] = currentPlayer;

    // update player
    setCurrentPlayer(currentPlayer === "x" ? "o" : "x");

    // update the state with the new board
    setGameBoard({ board: newBoard });
  }

  return (
    <>
      <h1>Tic Tac Toe</h1>
      <div>
        <span>Current Player: {currentPlayer}</span>
      </div>
      <div>
        <button onClick={() => setBoardCell(0, 0)}>
          {gameBoard.board[0][0]}
        </button>
        <button onClick={() => setBoardCell(0, 1)}>
          {gameBoard.board[0][1]}
        </button>
        <button onClick={() => setBoardCell(0, 2)}>
          {gameBoard.board[0][2]}
        </button>
      </div>
      <div>
        <button onClick={() => setBoardCell(1, 0)}>
          {gameBoard.board[1][0]}
        </button>
        <button onClick={() => setBoardCell(1, 1)}>
          {gameBoard.board[1][1]}
        </button>
        <button onClick={() => setBoardCell(1, 2)}>
          {gameBoard.board[1][2]}
        </button>
      </div>
      <div>
        <button onClick={() => setBoardCell(2, 0)}>
          {gameBoard.board[2][0]}
        </button>
        <button onClick={() => setBoardCell(2, 1)}>
          {gameBoard.board[2][1]}
        </button>
        <button onClick={() => setBoardCell(2, 2)}>
          {gameBoard.board[2][2]}
        </button>
      </div>
    </>
  );

  const getBoard = () => {
    const url = `http://localhost:3000/`;

    // fetch from url, result will be a string
    fetch(url)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        setMessage(result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const postMessage = () => {
    const url = `http://localhost:3000/`;
    const data = { message: inputValue };

    // send a POST request with data
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
        setMessage(result.message);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    console.log(event.target.value);
  };

  return (
    <>
      <div>
        <span>Message is {message}</span>
        <br />
        <br />
        <div>
          <button onClick={() => getMessage()}>Get Message</button>
        </div>
        <br />
        <div>
          <button onClick={() => postMessage()}>Post Message</button>
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Type something..."
        />
      </div>
    </>
  );
}

export default App;
