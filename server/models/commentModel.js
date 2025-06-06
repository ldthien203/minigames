import db from '../config/db.js'

const getComments = async (id, type) => {
  try {
    const query = `
      SELECT 
        c.comment_id,
        c.target_id,
        c.user_id,
        c.content,
        u.username,
        u.avatar
      FROM comment c
      LEFT JOIN "user" u ON u.user_id = c.user_id
      LEFT JOIN news n ON n.news_id = c.target_id
      LEFT JOIN games g ON g.game_id = c.target_id
      WHERE c.target_id = $1 AND c.target_type = $2
    `
    const result = await db.query(query, [id, type])
    return result.rows
  } catch (error) {
    console.error('Error getting news comment')
  }
}

const addComment = async (user_id, target_id, target_type, content) => {
  try {
    const query = `
      INSERT INTO comment (user_id, target_id, target_type, content)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `

    const result = await db.query(query, [
      user_id,
      target_id,
      target_type,
      content,
    ])

    return result.rows
  } catch (error) {
    console.error('Error adding news comment')
  }
}

export {getComments, addComment}
