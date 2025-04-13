import {Fragment} from 'react'
import GamesSinglePage from './components/GamesSinglePage/GamesSinglePage'
import GameAuthorSection from './components/GameAuthorSection/GameAuthorSection'

const GameDetail = () => {
  return (
    <Fragment>
      <GamesSinglePage />
      <GameAuthorSection />
    </Fragment>
  )
}

export default GameDetail
