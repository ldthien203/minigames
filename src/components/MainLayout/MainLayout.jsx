import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import './MainLayout.css'

const MainLayout = ({children}) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default MainLayout
