import {useState} from 'react'
import {useNavigate} from 'react-router'
import './Register.css'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [msg, setMsg] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMsg('Passwords do not match, please try again!')
      return
    }

    try {
      const response = await fetch('http://localhost:4000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, email, password}),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Registration failed')
      }

      setMsg('Registration successful! Please log in')
      setTimeout(() => navigate('/sign-in'), 1000)
    } catch (error) {
      setMsg(error.message)
    }
  }

  return (
    <div
      className="register-container"
      style={{backgroundImage: `url('/assets/img/login_background.png')`}}
    >
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>

        <label htmlFor="username">Username</label>
        <input
          id="username"
          placeholder="Enter username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        ></input>

        <label htmlFor="email">Email</label>
        <input
          id="email"
          placeholder="Enter your Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        ></input>

        <label htmlFor="password">Password</label>
        <input
          id="password"
          placeholder="Enter password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        ></input>

        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          id="confirm-password"
          placeholder="Confirm password"
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
        ></input>

        <button type="submit">Register</button>
        <p>{msg}</p>
      </form>
    </div>
  )
}

export default Register
