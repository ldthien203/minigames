import db from '../utils/db.js'

const getAllPlatform = async () => {
  const result = await db.query(`SELECT * FROM platform`)

  return result.rows
}

export {getAllPlatform}
