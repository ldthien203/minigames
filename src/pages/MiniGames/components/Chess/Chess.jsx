import ChessBoard from './components/ChessBoard/ChessBoard'
import './Chess.css'

const Chess = () => {
  return (
    <section className="chess-section">
      <div className="container">
        <div className="board-section">
          <ChessBoard />
        </div>
      </div>
    </section>
  )
}

export default Chess
