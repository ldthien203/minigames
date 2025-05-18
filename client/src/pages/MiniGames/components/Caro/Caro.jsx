import {useEffect, useState} from 'react'
import CaroBoard from './components/CaroBoard/CaroBoard'
import useCaro from '../../../../hooks/caro/useCaro'
import useCaroTurn from '../../../../hooks/caro/useCaroTurn'
import './Caro.css'

const Caro = () => {
  const [mode, setMode] = useState('online')
  const [offlineTurn, setOfflineTurn] = useState(false)

  const roomId = 'room1'

  const {
    board,
    handleClick: handleLocalClick,
    resetGame: resetLocalGame,
    boardSize,
    updateBoardSize,
    winner,
  } = useCaro()

  const {playerSymbol, isMyTurn, emitMove, emitReset, caroSocket} =
    useCaroTurn(roomId)

  useEffect(() => {
    if (!playerSymbol || !caroSocket) return

    const handleOpponentMove = index => {
      const opponentSymbol = playerSymbol === 'X' ? 'O' : 'X'
      handleLocalClick(index, opponentSymbol)
    }

    const handleResetFromSocket = () => {
      resetLocalGame()
    }

    const handleBoardSizeFromSocket = ({boardSize}) => {
      updateBoardSize(boardSize)
    }

    caroSocket.on('opponentMove', handleOpponentMove)
    caroSocket.on('gameReset', handleResetFromSocket)
    caroSocket.on('boardSizeChanged', handleBoardSizeFromSocket)

    return () => {
      caroSocket.off('opponentMove', handleOpponentMove)
      caroSocket.off('gameReset', handleResetFromSocket)
      caroSocket.off('boardSizeChanged', handleBoardSizeFromSocket)
    }
  }, [
    caroSocket,
    handleLocalClick,
    playerSymbol,
    resetLocalGame,
    updateBoardSize,
  ])

  const handleClick = index => {
    if (mode === 'offline') {
      if (board[index]) return
      handleLocalClick(index, offlineTurn ? 'X' : 'O')
      setOfflineTurn(t => !t)
    } else {
      if (!playerSymbol || !isMyTurn || board[index]) return
      console.log('player symbol: ', playerSymbol)
      handleLocalClick(index, playerSymbol)
      emitMove(index)
    }
  }

  const handleReset = () => {
    resetLocalGame()
    if (mode === 'offline') {
      setOfflineTurn(true)
    } else {
      emitReset && emitReset()
    }
  }

  const handleBoardSizeChange = e => {
    const newSize = Number(e.target.value)
    updateBoardSize(newSize)
    if (mode === 'online' && caroSocket) {
      caroSocket.emit('changeBoardSize', {roomId, boardSize: newSize})
    }
  }

  const currentTurn = isMyTurn ? playerSymbol : playerSymbol === 'X' ? 'O' : 'X'

  return (
    <section className="caro-section">
      {winner && (
        <div className="caro-modal-overlay">
          <div className="caro-modal-box">
            <h2>{winner === 'X' ? 'X' : 'O'} wins!</h2>
            <button className="reset-button" onClick={handleReset}>
              Reset game
            </button>
          </div>
        </div>
      )}
      <div className="container">
        <div className="board-section">
          <CaroBoard
            board={board}
            boardSize={boardSize}
            onClick={handleClick}
          />
        </div>

        <div className="controls-section">
          <div className="controls-container">
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
                className={`mode-toggle-btn${
                  mode === 'online' ? ' active' : ''
                }`}
                onClick={() => setMode('online')}
                disabled={mode === 'online'}
              >
                Online
              </button>
            </div>
            <h2>Game Caro ({mode === 'online' ? 'Online' : 'Offline'})</h2>
            <label>
              Board Size:
              <input
                type="number"
                value={boardSize}
                onChange={handleBoardSizeChange}
                className="board-size-input"
              />
            </label>
            <p className="message-status">
              Current size: {boardSize} x {boardSize}
            </p>
            {mode === 'online' ? (
              <>
                <p className="message-status">Current turn: {currentTurn}</p>
                <p className="message-status">Your symbol: {playerSymbol}</p>
              </>
            ) : (
              <p className="message-status">
                Player turn: {offlineTurn ? 'X' : 'O'}
              </p>
            )}
            <button className="reset-button" onClick={handleReset}>
              Reset Game
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Caro
