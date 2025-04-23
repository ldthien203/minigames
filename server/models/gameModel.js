import db from '../utils/db.js'

const getAllGames = async () => {
  try {
    const result = await db.query(`
      SELECT 
        g.game_id,
        g.name,
        g.release_date,
        g.summary,
        gi.thumbnail,
        gi.screenshot,
        ROUND(AVG(r.price), 1) AS avg_price,
        ROUND(AVG(r.graphics), 1) AS avg_graphics,
        ROUND(AVG(r.levels), 1) AS avg_levels,
        ROUND(AVG(r.gameplay), 1) AS avg_gameplay,
        ROUND(AVG(r.soundtrack), 1) AS avg_soundtrack 
      FROM games g
      JOIN game_image gi ON g.game_id = gi.game_id
      JOIN rating r ON g.game_id = r.game_id
      GROUP BY g.game_id, g.name, g.release_date, g.summary, gi.thumbnail, gi.screenshot
      ORDER BY g.release_date DESC
      `)
    return result.rows
  } catch (error) {
    console.error('Error getting all games', error.message)
  }
}

const getGameById = async id => {
  try {
    const result = await db.query(
      `
      SELECT g.*,
          gi.thumbnail,
          gi.screenshot,
          ROUND(AVG(r.price), 1) AS avg_price,
          ROUND(AVG(r.graphics), 1) AS avg_graphics,
          ROUND(AVG(r.levels), 1) AS avg_levels,
          ROUND(AVG(r.gameplay), 1) AS avg_gameplay,
          ROUND(AVG(r.soundtrack), 1) AS avg_soundtrack 
      FROM games g
      JOIN game_image gi ON g.game_id = gi.game_id
      JOIN rating r ON g.game_id = r.game_id
      WHERE g.game_id = $1 
      GROUP BY g.game_id, g.name, g.release_date, g.summary, gi.thumbnail, gi.screenshot
      `,
      [id],
    )
    return result.rows[0]
  } catch (error) {
    console.error('Error getting game', error.message)
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
    console.error('Error getting author comment', error.message)
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
    console.error('Error getting newest game', error.message)
  }
}

export {getAllGames, getGameById, getGameCommentAuthor, getNewestReleaseGame}

// `
// SELECT g.*,
//     ROUND(AVG(r.price), 1) AS avg_price,
//     ROUND(AVG(r.graphics), 1) AS avg_graphics,
//     ROUND(AVG(r.levels), 1) AS avg_levels,
//     ROUND(AVG(r.gameplay), 1) AS avg_gameplay,
//     ROUND(AVG(r.soundtrack), 1) AS avg_soundtrack
// from games g
// JOIN rating r ON g.game_id = r.game_id
// where g.game_id = $1
// GROUP BY g.game_id
// `,
