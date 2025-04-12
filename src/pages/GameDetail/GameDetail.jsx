import {Fragment} from 'react'
import NewsLetter from '../../components/NewsLetter/NewsLetter'
import PageTop from '../../components/PageTopSection/PageTopSection'
import GamesSinglePage from './components/GamesSinglePage/GamesSinglePage'
import GameAuthorSection from './components/GameAuthorSection/GameAuthorSection'
import pageTopBg from '../../assets/img/page-top-bg/1.jpg'

const GameDetail = () => {
  return (
    <Fragment>
      <PageTop title="Games" background={pageTopBg} />
      <GamesSinglePage />
      <GameAuthorSection />
      <NewsLetter />
    </Fragment>
  )
}

export default GameDetail
