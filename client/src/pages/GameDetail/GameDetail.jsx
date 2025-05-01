import {Fragment} from 'react'
import {useParams} from 'react-router-dom'
import useFetchData from '../../hooks/useFetchData'
import GamesSinglePage from './components/GamesSinglePage/GamesSinglePage'
import GameAuthorSection from './components/GameAuthorSection/GameAuthorSection'

const GameDetail = () => {
  const {id} = useParams()

  const {data, loading, error} = useFetchData(
    `http://localhost:4000/games/${id}`,
  )

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return (
    <Fragment>
      <GamesSinglePage game={data} />
      {data?.user_comment && data?.user_name && (
        <GameAuthorSection game={data} />
      )}
    </Fragment>
  )
}

export default GameDetail
