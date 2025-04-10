import {Fragment} from 'react'
import PageTop from '../../components/PageTopSection/PageTopSection'
import GameSection from './components/GameSection/GameSection'
import Featured from '../../components/FeaturedSection/FeaturedSection'
import NewsLetter from '../../components/NewsLetter/NewsLetter'
import pageTopBg from '../../assets/img/page-top-bg/1.jpg'

const Games = () => {
  return (
    <Fragment>
      <PageTop title="Games" background={pageTopBg} />
      <GameSection />
      <Featured />
      <NewsLetter />
    </Fragment>
  )
}

export default Games
