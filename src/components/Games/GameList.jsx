import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import './GameList.css'

const games = [
  {id: 'caro', name: 'Caro', image: require('../../assets/caro.png')},
  {id: 'game 2', name: 'Game 2', image: require('../../assets/caro.png')},
  {id: 'game 3', name: 'Game 3', image: require('../../assets/caro.png')},
  {id: 'game 4', name: 'Game 4', image: require('../../assets/caro.png')},
  {id: 'game 5', name: 'Game 5', image: require('../../assets/caro.png')},
  {id: 'game 6', name: 'Game 6', image: require('../../assets/caro.png')},
]

const GameList = () => {
  const [isFinding, setIsFinding] = useState(false)
  const [selectedGame, setSelectedGame] = useState(null)
  const nagivate = useNavigate()

  const handlePlayClick = gameId => {
    setIsFinding(true)
    setSelectedGame(gameId)

    setTimeout(() => {
      setIsFinding(false)
      if (gameId === 1) {
        nagivate(`/games/caro`)
      } else {
        nagivate(`/games/${gameId}`)
      }
    }, 3000)
  }

  return (
    <div>
      <div className="games-container">
        {games.map(game => (
          <div key={game.id} className="game-card">
            <img src={game.image} alt={game.name} className="game-image" />
            <div className="game-info">
              <h3>{game.name}</h3>
              <button
                className="play-button"
                onClick={() => handlePlayClick(game.id)}
              >
                PLAY
              </button>
            </div>
          </div>
        ))}
        {isFinding && (
          <div className="finding-overlay">
            <div className="finding-box">
              <h2>{selectedGame ? selectedGame.toUpperCase() : null}</h2>
              <p>Finding ...</p>
              <div className="loading-bar">
                <div className="loading-icon"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default GameList
