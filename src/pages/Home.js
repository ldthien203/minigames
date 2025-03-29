import '../App.css'
import {Fragment} from 'react'
import HeroSection from '../components/HeroSection/HeroSection'
import IntroList from '../components/IntroList/IntroList'

const Home = () => {
  return (
    <Fragment>
      <HeroSection />
      <IntroList />
    </Fragment>
  )
}

export default Home
