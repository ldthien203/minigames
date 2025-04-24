import {getAllGenres} from '../models/genreModel.js'

const fetchAllGenres = async (req, res) => {
  try {
    const categoryQueried = await getAllGenres()
    res.json(categoryQueried)
  } catch (error) {
    console.error('Error fetching all genres', error.message)
    res.status(500).json({error: 'Failed to fetch genres'})
  }
}

export {fetchAllGenres}
