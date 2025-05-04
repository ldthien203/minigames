import db from '../utils/db.js'

const getAllGames = async ({genre, platform, sort, order}) => {
  try {
    let queryStr = `
      SELECT 
        g.game_id,
        g.name,
        g.release_date,
        g.summary,
        c.name AS category_name,
        gi.thumbnail,
        ARRAY_AGG(DISTINCT p.name) AS platform_name,
        ARRAY_AGG(DISTINCT genre.short_name) AS genre_short_name,
        ROUND(AVG(r.price), 1) AS avg_price,
        ROUND(AVG(r.graphics), 1) AS avg_graphics,
        ROUND(AVG(r.levels), 1) AS avg_levels,
        ROUND(AVG(r.gameplay), 1) AS avg_gameplay,
        ROUND(AVG(r.soundtrack), 1) AS avg_soundtrack,
        ROUND(AVG((r.graphics + r.levels + r.gameplay + r.soundtrack + r.price) / 5), 1) AS avg_rating
      FROM games g
      LEFT JOIN game_image gi ON g.game_id = gi.game_id
      LEFT JOIN rating r ON g.game_id = r.game_id
      LEFT JOIN category c ON c.category_id = g.category_id
      LEFT JOIN game_platforms gp ON gp.game_id = g.game_id
      LEFT JOIN platform p ON p.platform_id = gp.platform_id
      LEFT JOIN game_genres gg ON gg.game_id = g.game_id
      LEFT JOIN genre ON genre.genre_id = gg.genre_id
      WHERE 1=1`

    const params = []

    if (genre) {
      queryStr += ` AND genre.name ILIKE $${
        params.length + 1
      } OR genre.short_name = $${params.length + 1}`
      params.push(genre)
    }

    if (platform) {
      queryStr += ` AND p.name ILIKE $${params.length + 1}`
      params.push(platform)
    }

    queryStr += ` 
      GROUP BY 
        g.game_id, c.name, g.release_date, 
        g.summary, gi.thumbnail`

    if (sort === 'rating' && order === 'desc') {
      queryStr += ` ORDER BY avg_rating DESC LIMIT 5`
    } else {
      queryStr += ` ORDER BY g.release_date DESC`
    }

    const result = await db.query(queryStr, params)

    return result.rows
  } catch (error) {
    console.error('Error getting all games:', error.message)
  }
}

const getGameById = async id => {
  try {
    const result = await db.query(
      `
      SELECT g.*,
          gi.thumbnail,
          gi.screenshot,
          ARRAY_AGG(DISTINCT genre.short_name) AS genre_short_name,
          ROUND(AVG(r.price), 1) AS avg_price,
          ROUND(AVG(r.graphics), 1) AS avg_graphics,
          ROUND(AVG(r.levels), 1) AS avg_levels,
          ROUND(AVG(r.gameplay), 1) AS avg_gameplay,
          ROUND(AVG(r.soundtrack), 1) AS avg_soundtrack 
      FROM games g
      LEFT JOIN game_image gi ON g.game_id = gi.game_id
      LEFT JOIN rating r ON g.game_id = r.game_id
      LEFT JOIN game_genres gg ON gg.game_id = g.game_id
      LEFT JOIN genre ON genre.genre_id = gg.genre_id 
      WHERE g.game_id = $1 
      GROUP BY g.game_id, g.name, g.release_date, g.summary, gi.thumbnail, gi.screenshot, genre.short_name
      `,
      [id],
    )
    return result.rows[0]
  } catch (error) {
    console.error('Error getting game:', error.message)
  }
}

const getGameCommentAuthor = async id => {
  try {
    const result = await db.query(
      `
      SELECT 
        u.name as user_name,
        u.avatar as user_avatar,
        uc.content as user_comment
      from user_comment uc
      JOIN "user" u ON uc.user_id = u.user_id
      WHERE uc.game_id = $1
      LIMIT 1
    `,
      [id],
    )
    return result.rows[0]
  } catch (error) {
    console.error('Error getting author comment:', error.message)
  }
}

const getNewestReleaseGame = async () => {
  try {
    const response = await db.query(`
      SELECT 
        g.game_id,
        g.name,
        g.release_date,
        g.summary,
        gi.screenshot
      FROM games g
      JOIN game_image gi ON g.game_id = gi.game_id
      ORDER BY release_date DESC
      LIMIT 1
      `)
    return response.rows[0]
  } catch (error) {
    console.error('Error getting newest game:', error.message)
  }
}

export {getAllGames, getGameById, getGameCommentAuthor, getNewestReleaseGame}
