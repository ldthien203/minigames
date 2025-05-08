import db from '../utils/db.js'

const getAllUsers = async () => {
  try {
    const result = await db.query(`SELECT * from "user"`)

    return result.rows
  } catch (error) {
    console.error(`Error getting all users: `, error.message)
  }
}

const getUserByUsername = async username => {
  try {
    const result = await db.query(
      `SELECT * 
      FROM "user" 
      WHERE LOWER(username) = LOWER($1)`,
      [username],
    )

    return result.rows[0]
  } catch (error) {
    console.error(`Error getting user: `, error.message)
  }
}

const insertUser = async (username, email, password) => {
  try {
    const query = `
    INSERT INTO "user" (username, email, password)
    VALUES ($1, $2, $3) RETURNING *
    `
    const result = await db.query(query, [username, email, password])
    return result.rows[0]
  } catch (error) {
    console.error(`Error inserting user: `, error.message)
  }
}

export {getAllUsers, getUserByUsername, insertUser}
