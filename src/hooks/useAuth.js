import {useEffect, useState, createContext, useContext} from 'react'

const AuthContext = createContext({})

const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthContextProvider = ({children}) => {
  const [user, setUser] = useState({})

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user')) || {
      name: 'Guest',
      age: 'Unknown',
      score: 0,
    }
    setUser(storedUser)
  }, [])

  const login = (username, password) => {
    if (username === 'admin' && password === '123') {
      const userData = {name: 'Admin', age: 25, score: 100}
      localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)
      return true
    } else {
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <AuthContext value={{user, setUser, login, logout}}>{children}</AuthContext>
  )
}

export default useAuth
