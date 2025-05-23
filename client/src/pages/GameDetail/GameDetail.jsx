import {Fragment} from 'react'
import {useParams} from 'react-router-dom'
import useFetchData from '../../hooks/useFetchData'
import GamesSinglePage from './components/GamesSinglePage/GamesSinglePage'
import GameAuthorSection from './components/GameAuthorSection/GameAuthorSection'
import Loading from '../../components/Loading/Loading'

const GameDetail = () => {
  const {id} = useParams()

  const {data, loading, error} = useFetchData(
    `http://localhost:4000/games/${id}`,
  )

  if (loading) return <Loading />
  if (error) return <p>{error}</p>

  return (
    <Fragment>
      <GamesSinglePage game={data} />
      {data?.user_comment && data?.user_name && (
        <GameAuthorSection
          key={data.user_id}
          userName={data.user_name}
          userComment={data.user_comment}
        />
      )}
    </Fragment>
  )
}

export default GameDetail
