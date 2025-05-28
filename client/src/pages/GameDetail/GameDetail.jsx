import {Fragment} from 'react'
import {useParams} from 'react-router-dom'
import useFetchData from '../../hooks/useFetchData'
import GamesSinglePage from './components/GamesSinglePage/GamesSinglePage'
import GameAuthorSection from './components/GameAuthorSection/GameAuthorSection'
import Loading from '../../components/Loading/Loading'

const GameDetail = () => {
  const {id} = useParams()

  const {data, loading, error} = useFetchData(
    `${process.env.REACT_APP_API_URL}/games/${id}`,
  )

  if (loading) return <Loading />
  if (error) return <p>{error}</p>

  return (
    <Fragment>
      <GamesSinglePage game={data} />
      {data?.user_comment && data?.user_username && (
        <GameAuthorSection
          key={data.user_id}
          userName={data.user_username}
          userComment={data.user_comment}
        />
      )}
    </Fragment>
  )
}

export default GameDetail
