import React from 'react'
import CaroBoard from './components/CaroBoard/CaroBoard'
import useCaro from '../../../../hooks/useCaro'
import './Caro.css'

const Caro = () => {
  const room = 'room1'

  const {
    board,
    handleClick,
    resetGame,
    messageStatus,
    boardSize,
    updateBoardSize,
  } = useCaro(room)

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
            <button className="reset-button" onClick={resetGame}>
              Reset Game
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Caro
