import {Fragment} from 'react'
import {useParams} from 'react-router-dom'
import useFetchData from '../../hooks/useFetchData'
import GamesSinglePage from './components/GamesSinglePage/GamesSinglePage'
import Loading from '../../components/Loading/Loading'

const GameDetail = () => {
  const {id} = useParams()

  const {
    data: game,
    loading: gameLoading,
    error: gameError,
  } = useFetchData(`${process.env.REACT_APP_API_URL}/games/${id}`)

  if (gameLoading) return <Loading />
  if (gameError) return <p>{gameError}</p>

  return <Fragment>{game && <GamesSinglePage game={game} />}</Fragment>
}

export default GameDetail
