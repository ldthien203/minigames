import db from '../utils/db.js'

const getAllNews = async () => {
  try {
    const result = await db.query(`
      SELECT 
        n.news_id,
        n.title,
        n.content,
        n.published_at AS publish_date,
        c.name AS category_name
      FROM news n
      JOIN category c ON c.category_id = n.category_id
      ORDER BY n.published_at DESC
      LIMIT 3
    `)
    return result.rows
  } catch (error) {
    console.error('Error getting all news', error.message)
  }
}

export {getAllNews}
