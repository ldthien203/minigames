import db from '../utils/db.js'

const getAllGames = async () => {
  const result = await db.query(`
    SELECT 
	    g.game_id,
	    g.name,
	    g.release_date,
	    g.summary,
	    gi.thumbnail
    FROM games g
    JOIN game_image gi ON g.game_id = gi.game_id
    `)
  return result.rows
}

const getGameById = async id => {
  const result = await db.query(
    `
    SELECT g.*,
        ROUND(AVG(r.price), 1) AS avg_price,
        ROUND(AVG(r.graphics), 1) AS avg_graphics,
        ROUND(AVG(r.levels), 1) AS avg_levels,
        ROUND(AVG(r.gameplay), 1) AS avg_gameplay,
        ROUND(AVG(r.soundtrack), 1) AS avg_soundtrack 
    from games g
    JOIN rating r ON g.game_id = r.game_id
    where g.game_id = $1 
    GROUP BY g.game_id
    `,
    [id],
  )
  return result.rows[0]
}

const getGameCommentAuthor = async id => {
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
}

export {getAllGames, getGameById, getGameCommentAuthor}

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
