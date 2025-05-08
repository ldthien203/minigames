import './Login.css'
import React from 'react'
import {useNavigate} from 'react-router'
import useAuth from '../../hooks/useAuth'

const Login = () => {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [message, setMessage] = React.useState('')
  const navigate = useNavigate()
  const {login} = useAuth()

  const handleClick = async () => {
    const success = await login(username, password)
    if (success) {
      setMessage('Login successful! Redirecting...')
      setTimeout(() => navigate('/'), 1000)
    } else {
      setMessage('Something wrong, try again!')
    }
  }

  return (
    <div className="login-container">
      <form className="login-form">
        <h2>Login</h2>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Username"
        ></input>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
        ></input>
        <button type="button" onClick={handleClick}>
          Login
        </button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  )
}

export default Login
