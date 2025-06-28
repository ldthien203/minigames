import {lazy, Suspense} from 'react'
import Header from '../Header/Header'
import PageTop from '../PageTopSection/PageTopSection'
import Loading from '../Loading/Loading'
import './MainLayout.css'

const NewsLetter = lazy(() => import('../NewsLetter/NewsLetter'))
const Footer = lazy(() => import('../Footer/Footer'))

const MainLayout = ({path, children}) => {
  return (
    <div>
      <Header />
      <PageTop path={path} />
      <main>{children}</main>
      <Suspense fallback={<Loading />}>
        <NewsLetter />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Footer />
      </Suspense>
    </div>
  )
}

export default MainLayout
