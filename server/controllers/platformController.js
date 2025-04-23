import {getAllPlatform} from '../models/platformModel.js'

const fetchAllPlatform = async (req, res) => {
  try {
    const queriedPlatform = await getAllPlatform()
    res.json(queriedPlatform)
  } catch (error) {
    console.error('Error fetching all platforms', error.message)
    res.status(500).json({error: 'Failed to fetch platforms'})
  }
}

export {fetchAllPlatform}
