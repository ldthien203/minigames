import './Login.css'
import React from 'react'
import {useNavigate, useLocation} from 'react-router'
import useAuth from '../../hooks/useAuth'

const Login = () => {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [message, setMessage] = React.useState('')
  const {login} = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const redirectPath = params.get('redirect') || '/'

  const handleSubmit = async e => {
    e.preventDefault()

    const success = await login(username, password)
    if (success) {
      setMessage('Login successful! Redirecting...')
      setTimeout(() => navigate(redirectPath), 1000)
    } else {
      setMessage('Something wrong, try again!')
    }
  }

  return (
    <div
      className="login-container"
      style={{backgroundImage: `url('/assets/img/login_background.png')`}}
    >
      <form className="login-form" onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
        <p>
          Don't have an account?{' '}
          <span className="register-link" onClick={() => navigate('/register')}>
            Register here
          </span>
        </p>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  )
}

export default Login
