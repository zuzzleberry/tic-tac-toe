import { useEffect, useState } from "react"
import "./App.css"

import React from "react"

const EMPTY_MATRIX = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

const App = () => {
  const [gameState, setGameState] = useState(EMPTY_MATRIX)
  const [currentPlayer, setCurrentPlayer] = useState(1)
  const [winner, setWinner] = useState(null)
  const [score, setScore] = useState({
    p1: 0,
    p2: 0,
  })

  useEffect(() => {
    checkForWin()
  }, [gameState])

  const handleMoveClick = (column, row) => {
    if (winner || gameState[row][column] !== null) {
      return
    }

    setGameState((gameState) => {
      gameState[row][column] = currentPlayer
      return [...gameState]
    })

    setCurrentPlayer(currentPlayer === 1 ? 2 : 1)
  }

  const updateScore = (currentPlayer) => {
    setScore({
      ...score,
      ...(currentPlayer === 1 ? { p1: score.p1 + 1 } : { p2: score.p2 + 1 }),
    })
  }

  const checkForWin = () => {
    //check horizontal
    gameState.forEach((row, index) => {
      if (row[0] === null) {
        return
      }
      if (row[0] === row[1] && row[0] === row[2]) {
        console.log(" horizontal winner detected")
        updateScore(currentPlayer)
        setWinner(currentPlayer === 1 ? 2 : 1)
        return
      }
    })

    //check vertical
    gameState[0].forEach((entry, index) => {
      if (
        entry === gameState[1][index] &&
        entry === gameState[2][index] &&
        entry !== null
      ) {
        console.log("vertical winner detected")
        updateScore(currentPlayer)
        setWinner(currentPlayer === 1 ? 2 : 1)
        return
      }
    })

    //check diagonal L & R
    if (
      (gameState[0][0] !== null &&
        gameState[0][0] === gameState[1][1] &&
        gameState[0][0] === gameState[2][2]) ||
      (gameState[0][2] !== null &&
        gameState[0][2] === gameState[1][1] &&
        gameState[0][2] === gameState[2][0])
    ) {
      console.log("diagonelly!")
      updateScore(currentPlayer)
      setWinner(currentPlayer === 1 ? 2 : 1)
      return
    }
  }

  const getBoxClassName = (column, row) => {
    if (gameState[row][column] === 1) {
      return "p1_selected"
    }

    if (gameState[row][column] === 2) {
      return "p2_selected"
    }
  }

  const newGame = () => {
    setGameState(EMPTY_MATRIX)
    setWinner(null)
  }

  return (
    <div className="App">
      <section className="App-header">
        <h1>tic tac toe</h1>

        <div className="score">
          <p style={{ textAlign: "left" }}>Player 1: {score.p1}</p>
          <p style={{ textAlign: "right" }}>Player 2: {score.p2}</p>
        </div>
        <div className="game-board">
          {gameState.map((entry, column) => (
            <div className="game-row">
              {gameState[column].map((entry, row) => (
                <button
                  onClick={() => handleMoveClick(column, row)}
                  className={getBoxClassName(column, row)}
                />
              ))}
            </div>
          ))}
        </div>
        {!winner && <p>Player {currentPlayer}'s turn</p>}
        {winner && <p>Player {winner} wins!</p>}
        {winner && <button onClick={newGame}>Play again</button>}
      </section>
    </div>
  )
}

export default App
