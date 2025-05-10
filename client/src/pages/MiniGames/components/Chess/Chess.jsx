import ChessBoard from './components/ChessBoard/ChessBoard'
import useChess from '../../../../hooks/useChess'
import useChessTurn from '../../../../hooks/useChessTurn'
import './Chess.css'

const Chess = () => {
  const roomId = 'room12'

  const {turn, playerColor, isMyTurn, emitMove, emitReset} = useChessTurn(
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
    setBoard,
    selectedSquare,
    validMoves,
    kingInCheck,
    handleSquareClick,
    resetBoard,
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
            kingInCheck={kingInCheck}
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
          <button className="reset-button" onClick={resetBoard}>
            Reset Game
          </button>
        </div>
      </div>
    </section>
  )
}

export default Chess
