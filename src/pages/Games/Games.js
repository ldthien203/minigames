import {Fragment} from 'react'
import PageTop from '../../components/PageTopSection/PageTopSection'
import GameSection from './components/GameSection/GameSection'
import Featured from '../../components/FeaturedSection/FeaturedSection'
import NewsLetter from '../../components/NewsLetter/NewsLetter'

const Games = () => {
  return (
    <Fragment>
      <PageTop title="Games" background="games" />
      <GameSection />
      <Featured />
      <NewsLetter />
    </Fragment>
  )
}

export default Games
