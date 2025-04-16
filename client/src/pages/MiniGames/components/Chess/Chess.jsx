import {useState} from 'react'
import ChessBoard from './components/ChessBoard/ChessBoard'
import {initialBoard} from '../../../../utils/chessUtils/boardUtils'
import './Chess.css'

const Chess = () => {
  const [gameState, setGameState] = useState({
    board: initialBoard,
    turn: 'white',
  })

  const handleResetGame = () => {
    setGameState({
      ...gameState,
      board: initialBoard,
      turn: 'white',
    })
  }

  return (
    <section className="chess-section">
      <div className="container">
        <div className="board-section">
          <ChessBoard gameState={gameState} setGameState={setGameState} />
        </div>
        <div className="game-info">
          <h2>Game Info</h2>
          <p>
            Current Turn: <span>{gameState.turn}</span>
          </p>
          <button className="reset-button" onClick={handleResetGame}>
            Reset Game
          </button>
        </div>
      </div>
    </section>
  )
}

export default Chess
