import {Fragment, lazy, Suspense} from 'react'
import HeroSection from './components/HeroSection/HeroSection'
import IntroSection from './components/IntroSection/IntroSection'
import BlogSection from './components/BlogSection/BlogSection'
import Loading from '../../components/Loading/Loading'
import '../../App.css'

const IntroVideoSection = lazy(() =>
  import('./components/IntroVideoSection/IntroVideoSection'),
)
const FeaturedSection = lazy(() =>
  import('../../components/FeaturedSection/FeaturedSection'),
)

const Home = () => {
  return (
    <Fragment>
      <HeroSection />
      <IntroSection />
      <BlogSection />
      <Suspense fallback={<Loading />}>
        <IntroVideoSection />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <FeaturedSection />
      </Suspense>
    </Fragment>
  )
}

export default Home
