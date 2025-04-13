import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import PageTop from '../PageTopSection/PageTopSection'
import NewsLetter from '../NewsLetter/NewsLetter'
import './MainLayout.css'

const MainLayout = ({path, children}) => {
  return (
    <div>
      <Header />
      <PageTop path={path} />
      <main>{children}</main>
      <NewsLetter />
      <Footer />
    </div>
  )
}

export default MainLayout
