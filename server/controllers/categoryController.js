import {getAllCategories} from '../models/categoryModel.js'

const fetchAllCategories = async (req, res) => {
  try {
    const categoryQueried = await getAllCategories()
    res.json(categoryQueried)
  } catch (error) {
    console.error('Error fetching all categories', error.message)
    res.status(500).json({error: 'Failed to fetch categories'})
  }
}

export {fetchAllCategories}
