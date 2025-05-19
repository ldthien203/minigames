import {useEffect, useState} from 'react'
import ChessBoard from './components/ChessBoard/ChessBoard'
import useChess from '../../../../hooks/chess/useChess'
import useChessTurn from '../../../../hooks/chess/useChessTurn'
import Loading from '../../../../components/Loading/Loading'
import './Chess.css'

const Chess = () => {
  const [mode, setMode] = useState('online')
  const [offlineTurn, setOfflineTurn] = useState(false)

  const roomId = 'room2'

  const {playerColor, isMyTurn, chessUser, chessSocket, emitMove, emitReset} =
    useChessTurn(roomId)

  const handleOfflineMoveSuccess = () => {
    setOfflineTurn(t => !t)
  }

  const onMove = ({from, to, board}) => {
    emitMove(from, to, board)
    if (mode === 'offline') {
      handleOfflineMoveSuccess()
    }
  }

  const {
    board,
    setBoard,
    selectedSquare,
    validMoves,
    kingInCheck,
    handleSquareClick,
    winner,
    resetBoard,
  } = useChess(playerColor, onMove)

  useEffect(() => {
    if (!playerColor || !chessSocket) return

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
  }, [chessSocket, playerColor, resetBoard, setBoard])

  const handleClick = (row, col) => {
    if (mode === 'offline') {
      handleSquareClick(row, col, offlineTurn ? 'black' : 'white')
    } else {
      if (!playerColor || !isMyTurn) return
      handleSquareClick(row, col, playerColor)
    }
  }

  const handleReset = () => {
    if (mode === 'offline') {
      setOfflineTurn(t => !t)
      resetBoard()
    } else {
      emitReset && emitReset()
      resetBoard()
    }
  }

  const renderStatus = () => {
    if (mode === 'offline') {
      return (
        <p>
          Current turn: <span>{offlineTurn ? 'Black' : 'White'}</span>
        </p>
      )
    }

    if (!chessUser) return <Loading message="Waiting for opponent..." />

    const currentTurn = isMyTurn ? chessUser?.yourUser : chessUser?.opponent

    return (
      <>
        <p className="message-status">
          Your color: <span>{playerColor}</span>
        </p>
        <p className="message-status">
          Current Turn: <span>{currentTurn}</span>
        </p>
      </>
    )
  }

  return (
    <section className="chess-section">
      {winner && (
        <div className="chess-modal-overlay">
          <div className="chess-modal-box">
            <h2>{winner === 'black' ? 'black' : 'white'} wins!</h2>
            <button className="reset-button" onClick={handleReset}>
              Reset game
            </button>
          </div>
        </div>
      )}
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
          <div>
            <button
              className={`mode-toggle-btn${
                mode === 'offline' ? ' active' : ''
              }`}
              onClick={() => setMode('offline')}
              disabled={mode === 'offline'}
            >
              Offline
            </button>
            <button
              className={`mode-toggle-btn${mode === 'online' ? ' active' : ''}`}
              onClick={() => setMode('online')}
              disabled={mode === 'online'}
            >
              Online
            </button>
          </div>
          <h2>Chess ({mode === 'offline' ? 'offline' : 'online'})</h2>

          {renderStatus()}

          <button className="reset-button" onClick={handleReset}>
            Reset Game
          </button>
        </div>
      </div>
    </section>
  )
}

export default Chess
