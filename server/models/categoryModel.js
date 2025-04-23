import db from '../utils/db.js'

const getAllCategories = async () => {
  const result = await db.query(`SELECT * from category`)

  return result.rows
}

export {getAllCategories}
