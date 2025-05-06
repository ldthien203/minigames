import ChessBoard from './components/ChessBoard/ChessBoard'
import useChess from '../../../../hooks/useChess'
import './Chess.css'
import {useState} from 'react'

const Chess = () => {
  const [mode, setMode] = useState('online')
  const roomId = 'room123'
  const {
    board,
    turn,
    handleSquareClick,
    selectedSquare,
    validMoves,
    handleResetGame,
  } = useChess(mode, roomId)

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
            Current Turn: <span>{turn}</span>
          </p>
          <button className="reset-button" onClick={handleResetGame}>
            Reset Game
          </button>
          <div>
            <button onClick={() => setMode('offline')}>Offline Mode</button>
            <button onClick={() => setMode('online')}>Online Mode</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Chess
