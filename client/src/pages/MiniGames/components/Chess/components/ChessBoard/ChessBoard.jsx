import {useState} from 'react'
import {getPieceImg} from '../../../../../../utils/chessUtils/boardUtils'
import './ChessBoard.css'
import {
  isPlayerTurn,
  isValidMove,
  getValidMoves,
  isKingInCheck,
} from '../../../../../../utils/chessUtils/chessLogic'

const ChessBoard = ({gameState, setGameState}) => {
  const {board, turn} = gameState
  const [selectedSquare, setSelectedSquare] = useState(null)
  const [validMoves, setValidMoves] = useState([])

  const clearSelection = () => {
    setSelectedSquare(null)
    setValidMoves([])
  }

  const handleSquareClick = (rowIndex, colIndex) => {
    const clickedPiece = board[rowIndex][colIndex]

    // If not selected then select
    if (!selectedSquare) {
      if (clickedPiece && isPlayerTurn(clickedPiece, turn)) {
        setSelectedSquare([rowIndex, colIndex])
        const moves = getValidMoves(rowIndex, colIndex, clickedPiece, board)
        setValidMoves(moves)
      }
      return
    }

    // If selected piece
    const [fromX, fromY] = selectedSquare
    const piece = board[fromX][fromY]

    if (rowIndex === fromX && colIndex === fromY) {
      clearSelection()
      return
    }

    if (isValidMove(piece, fromX, fromY, rowIndex, colIndex, board)) {
      const newBoard = board.map(row => [...row])
      newBoard[rowIndex][colIndex] = piece
      newBoard[fromX][fromY] = null

      const opponentColor = turn === 'white' ? 'black' : 'white'
      if (isKingInCheck(newBoard, opponentColor)) {
        console.log(`${opponentColor} king is in check`)
      }

      setGameState({
        ...gameState,
        board: newBoard,
        turn: opponentColor,
      })
    }

    clearSelection()
  }

  return (
    <div className="chess-board">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const isWhite = (rowIndex + colIndex) % 2 === 0
          const isSelected =
            selectedSquare &&
            selectedSquare[0] === rowIndex &&
            selectedSquare[1] === colIndex
          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`square ${isWhite ? 'white' : 'black'} ${
                isSelected ? 'selected' : ''
              }`}
              onClick={() => handleSquareClick(rowIndex, colIndex)}
            >
              {cell && (
                <img src={getPieceImg(cell)} alt={cell} className="piece" />
              )}
              {validMoves.some(
                ([x, y]) => x === rowIndex && y === colIndex,
              ) && <div className="move-dot" />}
            </div>
          )
        }),
      )}
    </div>
  )
}

export default ChessBoard
