import {useEffect, useState, createContext, useContext} from 'react'

const AuthContext = createContext({})

const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthContextProvider = ({children}) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'))
    if (storedUser) setUser(storedUser)
  }, [])

  const login = async (username, password) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password}),
      })

      if (!response.ok) {
        throw new Error('Invalid username or password')
      }

      const {user, token} = await response.json()
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', token)
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
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <AuthContext value={{user, setUser, login, logout, loading, error}}>
      {children}
    </AuthContext>
  )
}

export default useAuth
