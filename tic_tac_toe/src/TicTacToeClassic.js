import React, { useState } from "react";
import "./TicTacToeClassic.css";

/**
 * Main container for the TicTacToe Classic game.
 * Implements a two-player 3x3 grid, win/draw detection, and reset functionality.
 */
// PUBLIC_INTERFACE
function TicTacToeClassic() {
  // Initialize board state: empty array of 9 cells
  const [board, setBoard] = useState(Array(9).fill(null));
  // Track which player's turn it is: true for X, false for O
  const [isXNext, setIsXNext] = useState(true);
  // Record if the game has a winner or is draw
  const winner = calculateWinner(board);
  const isDraw = !winner && board.every(cell => cell !== null);

  // Handle cell click: mark cell and advance turn if allowed
  // PUBLIC_INTERFACE
  function handleCellClick(index) {
    // If game over or cell is filled, do nothing
    if (winner || board[index]) return;
    const newBoard = board.slice();
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  }

  // PUBLIC_INTERFACE
  function handleReset() {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  }

  // Compute status message
  let statusMsg = "";
  if (winner) {
    statusMsg = `Winner: Player ${winner}`;
  } else if (isDraw) {
    statusMsg = "It's a draw!";
  } else {
    statusMsg = `Current Turn: Player ${isXNext ? "X" : "O"}`;
  }

  return (
    <div className="ttt-container">
      <div className="ttt-turn-label" data-testid="turn-label">
        {winner || isDraw ? null : statusMsg}
      </div>

      <div className="ttt-board" role="grid" aria-label="Tic Tac Toe board">
        {board.map((cell, i) => (
          <button
            className={`ttt-cell ${cell ? "filled" : ""}`}
            key={i}
            aria-label={`Cell ${i + 1}`}
            aria-disabled={!!cell || !!winner}
            onClick={() => handleCellClick(i)}
            disabled={!!cell || !!winner}
            tabIndex={0}
            data-testid={`cell-${i}`}
          >
            {cell}
          </button>
        ))}
      </div>

      <div className="ttt-footer">
        <div
          className={`ttt-status-message ${winner ? "ttt-winner" : isDraw ? "ttt-draw" : ""}`}
          data-testid="status-message"
        >
          {winner || isDraw ? statusMsg : ""}
        </div>
        <button className="ttt-reset-btn" onClick={handleReset} data-testid="reset-btn">
          Reset
        </button>
      </div>
    </div>
  );
}

/**
 * Checks for a win on the board.
 * @param {string[]} squares - Array of board squares.
 * @returns {"X"|"O"|null} Winner if detected, otherwise null.
 */
// PUBLIC_INTERFACE
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonals
    [2, 4, 6]
  ];
  for (let [a, b, c] of lines) {
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  return null;
}

export default TicTacToeClassic;
