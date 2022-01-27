import logo from "./logo.svg";
import "./App.css";

import React from "react";

const App = () => {
  const [gameState, setGameState] = React.useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);

  const [currentPlayer, setCurrentPlayer] = React.useState(1);
  const [winner, setWinner] = React.useState(null);

  const ButtonClicked = (e) => {
    console.log(gameState);
    const row = e.target.parentNode.id;
    const column = e.target.id;
    const stateUpdate = [...gameState];

    if (gameState[row][column] !== null) {
      return;
    }

    stateUpdate[row][column] = currentPlayer;

    setGameState(stateUpdate);
    if (currentPlayer === 1) {
      setCurrentPlayer(2);
    }
    if (currentPlayer === 2) {
      setCurrentPlayer(1);
    }

    CheckForWin();
  };

  const CheckForWin = () => {
    console.log("checking for win");

    //check horizontal
    gameState.forEach((row, index) => {
      if (row[0] === null) {
        return;
      }
      if (row[0] === row[1] && row[0] === row[2]) {
        console.log(" horizontal winner detected");
        setWinner(currentPlayer);
        return;
      }
    });

    //check vertical
    gameState[0].forEach((entry, index) => {
      if (
        entry === gameState[1][index] &&
        entry === gameState[2][index] &&
        entry !== null
      ) {
        console.log("vertical winner detected");
        setWinner(currentPlayer);
        return;
      }
    });

    //check diagonal L & R
    if (
      (gameState[0][0] !== null &&
        gameState[0][0] === gameState[1][1] &&
        gameState[0][0] === gameState[2][2]) ||
      (gameState[0][2] !== null &&
        gameState[0][2] === gameState[1][1] &&
        gameState[0][2] === gameState[2][0])
    ) {
      console.log("diagonelly!");
      setWinner(currentPlayer);
      return;
    }
  };

  const GetClass = (index, idx) => {
    const row = index;
    const column = idx;

    if (gameState[row][column] === null) {
      return "unclicked";
    }

    if (gameState[row][column] === 1) {
      return "p1-clicked";
    }

    if (gameState[row][column] === 2) {
      return "p2-clicked";
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        tic tac toe
        {gameState.map((entry, index) => (
          <div className="game-row" id={index}>
            {gameState[index].map((entry, idx) => (
              <button
                onClick={ButtonClicked}
                id={idx}
                className={GetClass(index, idx)}
              ></button>
            ))}
          </div>
        ))}
        <h3>Player {currentPlayer}'s turn</h3>
        {winner ? <p>Player {winner} wins!</p> : null}
      </header>
    </div>
  );
};

export default App;
