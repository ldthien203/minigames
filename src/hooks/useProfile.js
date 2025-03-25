import {useState} from 'react'
import useAuth from './useAuth'

const useProfile = () => {
  const {user, setUser} = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const toggleEdit = () => setIsEditing(!isEditing)

  const saveProfile = () => {
    localStorage.setItem('user', JSON.stringify(user))
    setUser(user)
    setIsEditing(false)
  }

  const handleChange = e => {
    setUser({...user, [e.target.name]: e.target.value})
  }

  return {user, isEditing, toggleEdit, saveProfile, handleChange}
}

export default useProfile
