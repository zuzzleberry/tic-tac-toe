import logo from "./logo.svg";
import "./App.css";

import React from "react";

const emptyMatrix = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const App = () => {
  const [gameState, setGameState] = React.useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
  const [currentPlayer, setCurrentPlayer] = React.useState(1);
  const [winner, setWinner] = React.useState(null);

  const [score, setScore] = React.useState({
    p1: 0,
    p2: 0
  })

  const ButtonClicked = (e) => {
    if (winner) {
      return;
    }
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

  const UpdateScore = (currentPlayer) => {
    if (currentPlayer === 1) {
      setScore({
        ...score,
        p1: score.p1 += 1
      })
    } else {
      setScore({
        ...score,
        p2: score.p2 += 1
      })
    }
  }

  const CheckForWin = () => {
    console.log("checking for win");

    //check horizontal
    gameState.forEach((row, index) => {
      if (row[0] === null) {
        return;
      }
      if (row[0] === row[1] && row[0] === row[2]) {
        console.log(" horizontal winner detected");
        UpdateScore(currentPlayer);
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
        UpdateScore(currentPlayer);
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
      UpdateScore(currentPlayer);
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

  const NewGame = () => {
    setGameState([
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]);
    setWinner(null)
  };

  return (
    <div className="App">
      <header className="App-header">
        tic tac toe
        <div className="score">
          <p>Player 1: {score.p1}</p>
          <p>Player 2: {score.p2}</p>
        </div>
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
        {!winner ? <p>Player {currentPlayer}'s turn</p> : null}
        {winner ? <p>Player {winner} wins!</p> : null}
        {winner ? <button onClick={NewGame}>Play again</button> : null}
      </header>
    </div>
  );
};

export default App;
