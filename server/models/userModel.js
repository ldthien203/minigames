import db from '../config/db.js'

const getAllUsers = async () => {
  try {
    const result = await db.query(`
      SELECT 
        u.user_id,
        u.username,
        u.email,
        u.avatar,
        u.created_at,
        u.full_name AS fullname
      FROM "user" u
      `)

    return result.rows
  } catch (error) {
    console.error(`Error getting all users: `, error.message)
  }
}

const getUserByUsername = async username => {
  try {
    const result = await db.query(
      `SELECT 
        user_id,
        username,
        password,
        email,
        avatar,
        created_at,
        full_name AS fullname,
        age
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

const getUserById = async id => {
  try {
    const response = await db.query(
      `
      SELECT 
        u.user_id,
        u.username,
        u.email,
        u.avatar,
        u.created_at,
        u.full_name AS fullname,
        u.age
      FROM "user" u
      WHERE user_id = $1
      `,
      [id],
    )
    return response.rows[0]
  } catch (error) {
    console.error(`Error getting user by id: `, error.message)
  }
}

const updateUser = async ({
  user_id,
  username,
  fullname,
  age,
  email,
  avatar,
}) => {
  try {
    const query = `
      UPDATE "user"
      SET username = $1, full_name = $2, age = $3, email = $4, avatar = $5
      WHERE user_id = $6
      RETURNING username, full_name, age, email, avatar, user_id, created_at
    `

    const values = [username, fullname, age, email, avatar, user_id]
    const result = await db.query(query, values)

    return result.rows[0]
  } catch (error) {
    console.error('Error updating user: ', error.message)
  }
}

export {getAllUsers, getUserByUsername, getUserById, insertUser, updateUser}
