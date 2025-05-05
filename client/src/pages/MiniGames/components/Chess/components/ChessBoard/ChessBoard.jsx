import {getPieceImg} from '../../../../../../utils/chessUtils/boardUtils'
import './ChessBoard.css'

const ChessBoard = ({board, selectedSquare, validMoves, handleSquareClick}) => {
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
