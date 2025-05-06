import './CaroBoard.css'

const CaroBoard = ({board, boardSize, onClick}) => {
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

export default CaroBoard
