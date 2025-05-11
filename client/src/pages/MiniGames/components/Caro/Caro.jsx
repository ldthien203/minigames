import {useEffect} from 'react'
import CaroBoard from './components/CaroBoard/CaroBoard'
import useCaro from '../../../../hooks/caro/useCaro'
import useCaroTurn from '../../../../hooks/caro/useCaroTurn'
import './Caro.css'

const Caro = () => {
  const roomId = 'room1'

  const {
    board,
    handleClick: handleLocalClick,
    resetGame: resetLocalGame,
    messageStatus,
    boardSize,
    updateBoardSize,
  } = useCaro()

  const {playerSymbol, isMyTurn, emitMove, emitReset, caroSocket} =
    useCaroTurn(roomId)

  useEffect(() => {
    if (!playerSymbol) return

    const handleOpponentMove = index => {
      const opponentSymbol = playerSymbol === 'X' ? 'O' : 'X'
      handleLocalClick(index, opponentSymbol)
    }

    const handleResetFromSocket = () => {
      resetLocalGame()
    }

    caroSocket.on('opponentMove', handleOpponentMove)
    caroSocket.on('gameReset', handleResetFromSocket)

    return () => {
      caroSocket.off('opponentMove', handleOpponentMove)
      caroSocket.off('gameReset', handleResetFromSocket)
    }
  }, [caroSocket, handleLocalClick, playerSymbol, resetLocalGame])

  const handleClick = index => {
    console.log('Click:', {playerSymbol, isMyTurn, index, value: board[index]})

    if (!playerSymbol || !isMyTurn || board[index]) return
    handleLocalClick(index, playerSymbol)
    emitMove(index)
  }

  const handleReset = () => {
    resetLocalGame()
    emitReset()
  }

  return (
    <section className="caro-section">
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
            <h2>Game Caro</h2>
            <label>
              Board Size:
              <input
                type="number"
                value={boardSize}
                onChange={e => updateBoardSize(Number(e.target.value))}
                className="board-size-input"
              />
            </label>
            <p>
              Current size: {boardSize} x {boardSize}
            </p>
            <h2 className="message-status">{messageStatus()}</h2>
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
