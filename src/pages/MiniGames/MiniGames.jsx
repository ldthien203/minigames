import {Fragment, useState} from 'react'
import PageTop from '../../components/PageTopSection/PageTopSection'
import MiniGameList from './components/MiniGameList/MiniGameList'
import NewsLetter from '../../components/NewsLetter/NewsLetter'
import Caro from './components/Caro/Caro'
import pageTopBg from '../../assets/img/page-top-bg/1.jpg'

const MiniGames = () => {
  const [showPlay, setShowPlay] = useState(false)

  const handleShowPlaying = () => {
    setShowPlay(!showPlay)
  }

  return (
    <Fragment>
      <PageTop title="Mini Games" background={pageTopBg} />
      {showPlay ? <Caro /> : <MiniGameList onShowPlaying={handleShowPlaying} />}
      <NewsLetter />
    </Fragment>
  )
}

export default MiniGames
