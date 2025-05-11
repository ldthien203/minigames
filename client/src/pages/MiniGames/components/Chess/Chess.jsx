import ChessBoard from './components/ChessBoard/ChessBoard'
import useChess from '../../../../hooks/chess/useChess'
import useChessTurn from '../../../../hooks/chess/useChessTurn'
import './Chess.css'
import {useEffect, useState} from 'react'

const Chess = () => {
  const roomId = 'room12'
  const {playerColor, isMyTurn, chessSocket, emitMove, emitReset} =
    useChessTurn(roomId)
  const [isWhiteNext, setIsWhiteNext] = useState(true)

  const onMove = ({from, to, board}) => {
    emitMove(from, to, board)
    setIsWhiteNext(!isWhiteNext)
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
      setIsWhiteNext(!isWhiteNext)
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
  }, [board, chessSocket, isWhiteNext, resetBoard, setBoard])

  const handleClick = (row, col) => {
    if (!playerColor || !isMyTurn) return
    handleSquareClick(row, col, playerColor)
  }

  const handleReset = () => {
    resetBoard()
    emitReset()
  }

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
            Current Turn: <span>{isWhiteNext ? 'White' : 'Black'}</span>
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
