import {
  getAllGames,
  getGameById,
  getGameCommentAuthor,
} from '../models/gameModel.js'

const formatDate = date => {
  return new Date(date).toLocaleDateString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

const fetchAllGames = async (req, res) => {
  try {
    const gamesQueried = await getAllGames()
    const games = gamesQueried.map(game => {
      return {...game, release_date: formatDate(game.release_date)}
    })
    res.json(games)
  } catch (error) {
    console.error('Error fetching games:', error.message)
    res.status(500).json({error: 'Failed to fetch games'})
  }
}

const fetchGameById = async (req, res) => {
  const id = req.params.id
  try {
    const gameQueried = await getGameById(id)
    const comment = await getGameCommentAuthor(id)

    const game = {
      ...gameQueried,
      release_date: formatDate(gameQueried.release_date),
      avg_price: Number(gameQueried.avg_price),
      avg_graphics: Number(gameQueried.avg_graphics),
      avg_levels: Number(gameQueried.avg_levels),
      avg_gameplay: Number(gameQueried.avg_gameplay),
      avg_soundtrack: Number(gameQueried.avg_soundtrack),
    }
    res.json({...game, ...comment})
  } catch (error) {
    console.error('Error fetching games:', error.message)
    res.status(500).json({error: 'Failed to fetch games'})
  }
}

export {fetchAllGames, fetchGameById}
