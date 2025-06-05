import {useState} from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import './GameLoginWarning.css'

const GameLoginWarning = ({user}) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  if (!user)
    return (
      <div className="login-warning">
        <button className="close-button" onClick={() => setIsVisible(false)}>
          ×
        </button>
        <p>You need to log in to play online.</p>
        <button
          className="redirect-button"
          onClick={() => {
            navigate(`/sign-in?redirect=${location.pathname}`)
          }}
        >
          Go to Login
        </button>
      </div>
    )
}

export default GameLoginWarning
