import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {getUserByUsername, insertUser} from '../models/userModel.js'
import {capializeFirstLetter} from '../utils/dataFormat.js'

const login = async (req, res) => {
  const {username, password} = req.body

  try {
    const user = await getUserByUsername(username)
    if (!user) {
      throw new Error('User not found')
    }
    const valid = await verifyPassword(password, user.password)

    if (!valid) {
      throw new Error('Invalid password')
    }

    const token = jwt.sign(
      {id: user.user_id, username: user.username},
      process.env.JWT_SECRET_KEY,
      {expiresIn: '1h'},
    )

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.user_id,
        username: capializeFirstLetter(username),
        email: user.email,
      },
    })
  } catch (error) {
    console.error('Error when login: ', error.message)
    res.status(500).json({error: 'Login failed'})
  }
}

const register = async (req, res) => {
  const {username, email, password} = req.body
  try {
    const userExists = await getUserByUsername(username)
    if (userExists.length > 0) {
      return res.status(400).json({message: 'Username existed'})
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await insertUser(username, email, hashedPassword)
    res.status(201).json({message: 'Register successful'})
  } catch (error) {
    console.error('Error when register: ', error.message)
    res.status(500).json({error: 'Register failed'})
  }
}

const verifyPassword = async (plainPassword, hashedPassword) => {
  try {
    return bcrypt.compare(plainPassword, hashedPassword)
  } catch (error) {
    console.error(`Error verifying password: `, error.message)
  }
}

export {login, register}
