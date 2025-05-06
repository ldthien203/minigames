import ChessBoard from './components/ChessBoard/ChessBoard'
import useChess from '../../../../hooks/useChess'
import useGameTurn from '../../../../hooks/useGameTurn'
import './Chess.css'

const Chess = () => {
  const roomId = 'room123'

  const {turn, playerColor, isMyTurn, emitMove, emitReset} = useGameTurn(
    roomId,
    (from, to) => {
      const newBoard = [...board.map(row => [...row])]
      const piece = newBoard[from[0]][from[1]]
      newBoard[from[0]][from[1]] = null
      newBoard[to[0]][to[1]] = piece
      setBoard(newBoard)
    },
    () => {
      resetBoard()
    },
  )

  const {
    board,
    handleSquareClick,
    selectedSquare,
    validMoves,
    resetBoard,
    setBoard,
  } = useChess({
    turn,
    isMyTurn,
    onMove: ({from, to, board}) => {
      emitMove(from, to)
      setBoard(board)
    },
  })

  return (
    <section className="chess-section">
      <div className="container">
        <div className="board-section">
          <ChessBoard
            board={board}
            turn={turn}
            validMoves={validMoves}
            selectedSquare={selectedSquare}
            handleSquareClick={handleSquareClick}
          />
        </div>
        <div className="game-info">
          <h2>Game Info</h2>
          <p>
            Your color: <span>{playerColor}</span>
          </p>
          <p>
            Current Turn: <span>{turn}</span>
          </p>
          <button className="reset-button" onClick={emitReset}>
            Reset Game
          </button>
        </div>
      </div>
    </section>
  )
}

export default Chess
