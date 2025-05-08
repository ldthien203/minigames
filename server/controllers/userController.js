import {getAllUsers} from '../models/userModel.js'
import {formatDate} from '../utils/gameUtils.js'

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

export {fetchAllUsers}
