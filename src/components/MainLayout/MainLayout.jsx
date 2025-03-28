import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import './MainLayout.css'

const MainLayout = ({children}) => {
  return (
    <div>
      <Header />
      <main style={{height: '100vh'}}>{children}</main>
      <Footer />
    </div>
  )
}

export default MainLayout
