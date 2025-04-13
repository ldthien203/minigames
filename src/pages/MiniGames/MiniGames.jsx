import {Fragment, useState} from 'react'
import ListMiniGame from './components/ListMiniGame/ListMiniGame'
import Caro from './components/Caro/Caro'
import Chess from './components/Chess/Chess'
import caroImg from '../../assets/img/minigames/caro.png'
import chessImg from '../../assets/img/minigames/chess.png'

const games = [
  {id: 'caro', name: 'Caro', image: caroImg, component: <Caro />},
  {id: 'chess', name: 'Chess', image: chessImg, component: <Chess />},
  {id: 'caro-1', name: 'Caro-1', image: caroImg, component: <Caro />},
  {id: 'chess-1', name: 'Chess-1', image: chessImg, component: <Chess />},
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
