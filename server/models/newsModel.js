import db from '../utils/db.js'

const getAllNews = async ({type}) => {
  try {
    let queryStr = `
      SELECT 
        n.news_id,
        n.title,
        n.content,
        n.published_at AS publish_date,
        n.view_count,
        c.name AS category_name,
        nt.type AS news_type
      FROM news n
      JOIN category c ON c.category_id = n.category_id
      JOIN news_types nt ON nt.news_type_id = n.news_type_id
      WHERE 1=1`

    const params = []

    if (type) {
      queryStr += ` AND nt.type = $${params.length + 1} `
      params.push(type)
    }

    queryStr += ` 
      ORDER BY n.published_at DESC
    `

    const result = await db.query(queryStr, params)
    return result.rows
  } catch (error) {
    console.error('Error getting all news', error.message)
  }
}

const getNewsById = async id => {
  try {
    let queryStr = `
      SELECT 
        n.news_id,
        n.title,
        n.content,
        n.published_at AS publish_date,
        nt.type AS news_type,
        c.name AS category_name,
        ARRAY_AGG(
          JSON_BUILD_OBJECT(
            'user_id', nc.user_id, 
            'user_name', u.name,
            'user_comment', nc.content
          )
        ) AS comments
      FROM news n
      LEFT JOIN news_types nt ON nt.news_type_id = n.news_type_id
      LEFT JOIN category c ON c.category_id = n.category_id
      LEFT JOIN news_comment nc ON nc.news_id = n.news_id
      LEFT JOIN "user" u ON u.user_id = nc.user_id
      WHERE n.news_id = $1
      GROUP BY n.news_id, nt.type, c.name`

    const result = await db.query(queryStr, [id])
    return result.rows[0]
  } catch (error) {
    console.error('Error getting news by id:', error.message)
  }
}

const getAllNewsType = async () => {
  try {
    const result = await db.query(`SELECT * FROM news_types`)
    return result.rows
  } catch (error) {
    console.error('Error getting news by id:', error.message)
  }
}

const getTrendingNews = async ({limit = 4}) => {
  try {
    const result = await db.query(
      `
      SELECT 
        n.news_id,
        n.title,
        n.published_at AS publish_date,
        n.view_count,
        c.name AS category_name
      FROM news n
      JOIN category c ON c.category_id = n.category_id
      ORDER BY n.view_count DESC
      LIMIT $1
    `,
      [limit],
    )

    return result.rows
  } catch (error) {
    console.error('Error getting trending news:', error.message)
  }
}

export {getAllNews, getNewsById, getAllNewsType, getTrendingNews}
