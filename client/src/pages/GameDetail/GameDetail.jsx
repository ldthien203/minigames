import {Fragment, useState, useEffect} from 'react'
import GamesSinglePage from './components/GamesSinglePage/GamesSinglePage'
import GameAuthorSection from './components/GameAuthorSection/GameAuthorSection'
import {useParams} from 'react-router-dom'

const GameDetail = () => {
  const {id} = useParams()
  const [gameData, setGameData] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchGameDetail = async () => {
      try {
        const response = await fetch(`http://localhost:4000/games/${id}`)
        const data = await response.json()
        console.log(data)

        setGameData(data)
      } catch (error) {
        console.error('Error fetching game detail: ', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchGameDetail()
  }, [id])

  return (
    <Fragment>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <>
          <GamesSinglePage game={gameData} />
          <GameAuthorSection game={gameData} />
        </>
      )}
    </Fragment>
  )
}

export default GameDetail
