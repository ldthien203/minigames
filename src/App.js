import {BrowserRouter, Route, Routes} from 'react-router'
import './App.css'
import Caro from './components/Games/Caro'
import Home from './pages/Home'
import Games from './pages/Games'
import Login from './pages/Login/Login'
import Profile from './pages/Profile/Profile'
import MainLayout from './components/MainLayout/MainLayout'

const MainRouter = [
  {path: '/home', component: <Home />},
  {path: '/profile', component: <Profile />},
  {path: '/games', component: <Games />},
  {path: '/games/caro', component: <Caro />},
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
