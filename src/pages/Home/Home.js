import '../../App.css'
import {Fragment} from 'react'
import HeroSection from './components/HeroSection/HeroSection'
import IntroSection from './components/IntroSection/IntroSection'
import BlogSection from './components/BlogSection/BlogSection'

const Home = () => {
  return (
    <Fragment>
      <HeroSection />
      <IntroSection />
      <BlogSection />
    </Fragment>
  )
}

export default Home
