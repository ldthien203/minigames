import '../../App.css'
import {Fragment} from 'react'
import HeroSection from './components/HeroSection/HeroSection'
import IntroSection from './components/IntroSection/IntroSection'
import BlogSection from './components/BlogSection/BlogSection'
import IntroVideoSection from './components/IntroVideoSection/IntroVideoSection'
import FeaturedSection from '../../components/FeaturedSection/FeaturedSection'
import NewsLetter from '../../components/NewsLetter/NewsLetter'

const Home = () => {
  return (
    <Fragment>
      <HeroSection />
      <IntroSection />
      <BlogSection />
      <IntroVideoSection />
      <FeaturedSection />
      <NewsLetter />
    </Fragment>
  )
}

export default Home
