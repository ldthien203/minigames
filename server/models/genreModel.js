import db from '../utils/db.js'

const getAllGenres = async () => {
  const result = await db.query(`SELECT * from genre`)

  return result.rows
}

export {getAllGenres}
