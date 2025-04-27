import {Fragment, useState} from 'react'
import {useParams} from 'react-router-dom'
import useFetchData from '../../hooks/useFetchData'
import GamesSinglePage from './components/GamesSinglePage/GamesSinglePage'
import GameAuthorSection from './components/GameAuthorSection/GameAuthorSection'

const GameDetail = () => {
  const {id} = useParams()
  const [gameData, setGameData] = useState({})

  useFetchData(
    `http://localhost:4000/games/${id}`,
    setGameData,
    'Error fetching game detail: ',
  )

  return (
    <Fragment>
      <GamesSinglePage game={gameData} />
      {gameData.user_comment && gameData.user_name && (
        <GameAuthorSection game={gameData} />
      )}
    </Fragment>
  )
}

export default GameDetail
