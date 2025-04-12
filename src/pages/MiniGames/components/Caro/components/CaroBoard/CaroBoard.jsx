import './CaroBoard.css'

const Board = ({board, boardSize, onClick}) => {
  return (
    <div className="board" style={{'--board-size': boardSize}}>
      {board.map((value, index) => (
        <button
          key={index}
          className="square"
          onClick={() => onClick(index)}
          disabled={value !== null}
        >
          <div>{value}</div>
        </button>
      ))}
    </div>
  )
}

export default Board
