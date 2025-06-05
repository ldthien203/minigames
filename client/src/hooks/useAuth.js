import {useEffect, useState, createContext, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'

const AuthContext = createContext({})

const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthContextProvider = ({children}) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = Cookies.get('user')
    if (storedUser) setUser(JSON.parse(storedUser))
  }, [])

  const login = async (username, password) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({username, password}),
        },
      )

      if (!response.ok) {
        throw new Error('Invalid username or password')
      }

      const {user, token} = await response.json()
      Cookies.set('user', JSON.stringify(user), {expires: 7})
      Cookies.set('token', token, {expires: 1})
      setUser(user)
      return true
    } catch (error) {
      setError(error.message)
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    navigate('/sign-in')
    Cookies.remove('user')
    Cookies.remove('token')
    setUser(null)
  }

  return (
    <AuthContext value={{user, setUser, login, logout, loading, error}}>
      {children}
    </AuthContext>
  )
}

export default useAuth
