import {getAllUsers, getUserById, updateUser} from '../models/userModel.js'
import {formatDate} from '../utils/dataFormat.js'

const fetchAllUsers = async (req, res) => {
  try {
    const queriedUsers = await getAllUsers()
    const users = queriedUsers.map(user => ({
      ...user,
      created_at: formatDate(user.created_at),
    }))

    res.json(users)
  } catch (error) {
    console.error(`Error fetching all users: `, error.message)
    res.status(500).json({error: 'Failed to fetch all users'})
  }
}

const fetchUserById = async (req, res) => {
  const userId = req.user.id
  try {
    const queriedUser = await getUserById(userId)
    const user = {
      ...queriedUser,
      created_at: formatDate(queriedUser.created_at),
    }
    res.json(user)
  } catch (error) {
    console.error(`Error fetching user by username: `, error.message)
    res.status(500).json({error: 'Failed to fetch user by username'})
  }
}

const updateUserById = async (req, res) => {
  const {user_id, username, fullname, age, email, avatar} = req.body
  try {
    const updatedUser = await updateUser({
      user_id,
      username,
      fullname,
      age,
      email,
      avatar,
    })

    res.json(updatedUser)
  } catch (error) {
    console.error('Error fetching update user:', error.message)
    res.status(500).json({error: 'Failed to update user'})
  }
}

export {fetchAllUsers, fetchUserById, updateUserById}
