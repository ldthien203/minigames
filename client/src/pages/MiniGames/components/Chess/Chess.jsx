import {useEffect} from 'react'
import ChessBoard from './components/ChessBoard/ChessBoard'
import useChess from '../../../../hooks/chess/useChess'
import useChessTurn from '../../../../hooks/chess/useChessTurn'
import './Chess.css'

const Chess = () => {
  const roomId = 'room12'
  const {playerColor, isMyTurn, chessSocket, emitMove, emitReset} =
    useChessTurn(roomId)

  const onMove = ({from, to, board}) => {
    emitMove(from, to, board)
  }

  const {
    board,
    setBoard,
    selectedSquare,
    validMoves,
    kingInCheck,
    handleSquareClick,
    resetBoard,
  } = useChess(onMove)

  useEffect(() => {
    const handleOpponentMove = ({from, to, board: newBoard}) => {
      if (newBoard) setBoard(newBoard)
    }

    const handleResetFromSocket = () => {
      resetBoard()
    }

    chessSocket.on('opponentMove', handleOpponentMove)
    chessSocket.on('gameReset', handleResetFromSocket)

    return () => {
      chessSocket.off('opponentMove', handleOpponentMove)
      chessSocket.off('gameReset', handleResetFromSocket)
    }
  }, [chessSocket, resetBoard, setBoard])

  const handleClick = (row, col) => {
    if (!playerColor || !isMyTurn) return
    handleSquareClick(row, col, playerColor)
  }

  const handleReset = () => {
    resetBoard()
    emitReset()
  }

  const currentTurn = isMyTurn
    ? playerColor
    : playerColor === 'white'
    ? 'black'
    : 'white'

  return (
    <section className="chess-section">
      <div className="container">
        <div className="board-section">
          <ChessBoard
            board={board}
            validMoves={validMoves}
            kingInCheck={kingInCheck}
            selectedSquare={selectedSquare}
            handleSquareClick={handleClick}
          />
        </div>
        <div className="game-info">
          <h2>Game Info</h2>
          <p>
            Your color: <span>{playerColor}</span>
          </p>
          <p>
            Current Turn: <span>{currentTurn}</span>
          </p>
          <button className="reset-button" onClick={handleReset}>
            Reset Game
          </button>
        </div>
      </div>
    </section>
  )
}

export default Chess
