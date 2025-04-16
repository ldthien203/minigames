import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import './ListMiniGame.css'

const MiniGameList = ({onSelectGame, games}) => {
  const [isFinding, setIsFinding] = useState(false)
  const [selectedGame, setSelectedGame] = useState(null)
  const nagivate = useNavigate()

  const handlePlayClick = gameId => {
    setIsFinding(true)
    setSelectedGame(gameId)

    setTimeout(() => {
      onSelectGame(gameId)
      setIsFinding(false)
      nagivate(`/games/minigames/${gameId}`)
    }, 2000)
  }

  return (
    <section className="minigame-list-section">
      <div className="container">
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
    </section>
  )
}

export default MiniGameList
