import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import './MiniGameList.css'
import caroImg from '../../../../assets/img/caro.png'

const games = [
  {id: 'caro', name: 'Caro', image: caroImg},
  {id: 'caro-2', name: 'Game 2', image: caroImg},
  {id: 'caro-4', name: 'Game 4', image: caroImg},
  {id: 'caro-5', name: 'Game 5', image: caroImg},
  {id: 'caro-3', name: 'Game 3', image: caroImg},
  {id: 'caro-6', name: 'Game 6', image: caroImg},
]

const MiniGameList = ({onShowPlaying}) => {
  const [isFinding, setIsFinding] = useState(false)
  const [selectedGame, setSelectedGame] = useState(null)
  const nagivate = useNavigate()

  const handlePlayClick = gameId => {
    setIsFinding(true)
    setSelectedGame(gameId)

    setTimeout(() => {
      onShowPlaying()
      setIsFinding(false)
      nagivate(`/games/minigames/${gameId}`)
    }, 3000)
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
