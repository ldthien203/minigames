import {Fragment, useState} from 'react'
import ListMiniGame from './components/ListMiniGame/ListMiniGame'
import Caro from './components/Caro/Caro'
import Chess from './components/Chess/Chess'

const games = [
  {
    id: 'caro',
    name: 'Caro',
    image: '/assets/img/minigames/caro.png',
    component: <Caro />,
  },
  {
    id: 'chess',
    name: 'Chess',
    image: '/assets/img/minigames/chess.png',
    component: <Chess />,
  },
]

const MiniGames = () => {
  const [selectedGameId, setSelectedGameId] = useState(false)
  const selectedGame = games.find(game => game.id === selectedGameId)

  const handleSelectedGame = gameId => {
    setSelectedGameId(gameId)
  }

  return (
    <Fragment>
      {selectedGame ? (
        selectedGame.component
      ) : (
        <ListMiniGame onSelectGame={handleSelectedGame} games={games} />
      )}
    </Fragment>
  )
}

export default MiniGames
