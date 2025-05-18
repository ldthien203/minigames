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

  const {playerSymbol, isXTurn, caroUser, emitMove, emitReset, caroSocket} =
    useCaroTurn(roomId)

  useEffect(() => {
    if (!playerSymbol || !caroSocket) return

    const handleOpponentMove = index => {
      const opponentSymbol = playerSymbol === 'X' ? 'O' : 'X'
      handleLocalClick(index, opponentSymbol)
    }

    const handleResetFromSocket = () => resetLocalGame()

    const handleBoardSizeFromSocket = ({boardSize}) =>
      updateBoardSize(boardSize)

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
    if (board[index]) return
    if (mode === 'offline') {
      handleLocalClick(index, offlineTurn ? 'X' : 'O')
      setOfflineTurn(t => !t)
    } else {
      if (!playerSymbol || !isXTurn || board[index]) return
      handleLocalClick(index, playerSymbol)
      emitMove(index)
    }
  }

  const handleReset = () => {
    resetLocalGame()
    mode === 'offline' ? setOfflineTurn(true) : emitReset && emitReset()
  }

  const handleBoardSizeChange = e => {
    const newSize = Number(e.target.value)
    updateBoardSize(newSize)
    if (mode === 'online' && caroSocket) {
      caroSocket.emit('changeBoardSize', {roomId, boardSize: newSize})
    }
  }

  const renderStatus = () => {
    if (mode === 'offline') {
      return (
        <p className="message-status">Player turn: {offlineTurn ? 'X' : 'O'}</p>
      )
    }

    if (!caroUser)
      return <p className="message-status">Waiting for opponent...</p>

    const currentTurnUser = isXTurn ? caroUser.yourUser : caroUser.opponent

    return (
      <>
        {!winner ? (
          <p className="message-status">
            Current turn: <strong>{currentTurnUser ?? ''}</strong>
          </p>
        ) : (
          <p className="message-status">{winnerUsername} wins!</p>
        )}
        <p className="message-status">Your symbol: {playerSymbol}</p>
      </>
    )
  }

  const winnerUsername =
    winner === playerSymbol ? caroUser?.yourUser : caroUser?.opponent

  return (
    <section className="caro-section">
      {winner && (
        <div className="caro-modal-overlay">
          <div className="caro-modal-box">
            <h2>{winnerUsername} wins!</h2>
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
            <h2>Game Caro ({mode})</h2>
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

            {renderStatus()}

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
