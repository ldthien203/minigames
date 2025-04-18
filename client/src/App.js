import {BrowserRouter, Route, Routes} from 'react-router'
import './App.css'
import MainLayout from './components/MainLayout/MainLayout'
import Home from './pages/Home/Home'
import Games from './pages/Games/Games'
import Login from './pages/Login/Login'
import Profile from './pages/Profile/Profile'
import Reviews from './pages/Reviews/Reviews'
import Contact from './pages/Contact/Contact'
import News from './pages/News/News'
import GameDetail from './pages/GameDetail/GameDetail'
import MiniGames from './pages/MiniGames/MiniGames'
import Caro from './pages/MiniGames/components/Caro/Caro'
import Chess from './pages/MiniGames/components/Chess/Chess'
import {AuthContextProvider} from './hooks/useAuth'
import {useEffect, useState} from 'react'

const MainRouter = [
  {path: '/', component: <Home />},
  {path: '/profile', component: <Profile />},
  {path: '/reviews', component: <Reviews />},
  {path: '/contact', component: <Contact />},
  {path: '/news', component: <News />},
  {path: '/games', component: <Games />},
  {path: '/games/:detail', component: <GameDetail />},
  {path: '/games/minigames', component: <MiniGames />},
  {path: '/games/minigames/caro', component: <Caro />},
  {path: '/games/minigames/chess', component: <Chess />},
]

function App() {
  const [backendData, setBackendData] = useState([{}])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api')
        const data = await response.json()
        console.log(data)
        setBackendData(data)
      } catch (error) {
        console.log(`Error: ${error.message}`)
      }
    }

    fetchData()
  }, [])

  return (
    <BrowserRouter>
      <AuthContextProvider>
        {typeof backendData.users === 'undefined' ? (
          <p>Loading...</p>
        ) : (
          backendData.users.map(user => <li key={user}>{user}</li>)
        )}
        <Routes>
          <Route path="sign-in" element={<Login />} />
          {MainRouter.map(el => (
            <Route
              key={el.path}
              path={el.path}
              element={<MainLayout path={el.path}>{el.component}</MainLayout>}
            />
          ))}
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  )
}

export default App
