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

const MainRouter = [
  {path: '/', component: <Home />},
  {path: '/profile', component: <Profile />},
  {path: '/reviews', component: <Reviews />},
  {path: '/contact', component: <Contact />},
  {path: '/news', component: <News />},
  {path: '/games', component: <Games />},
  {path: '/games/:detail', component: <GameDetail />},
  {path: '/games/minigames', component: <MiniGames />},
  {path: '/games/minigames/:caro', component: <MiniGames />},
]

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="sign-in" element={<Login />} />
        {MainRouter.map(el => (
          <Route
            key={el.path}
            path={el.path}
            element={<MainLayout>{el.component}</MainLayout>}
          />
        ))}
      </Routes>
    </BrowserRouter>
  )
}

export default App
