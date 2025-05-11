import {formatDate, processGameData} from '../utils/dataFormat.js'
import {
  getAllGames,
  getGameById,
  getGameCommentAuthor,
  getNewestReleaseGame,
} from '../models/gameModel.js'

const fetchAllGames = async (req, res) => {
  try {
    const {genre, platform, sort, order} = req.query
    const gamesQueried = await getAllGames({genre, platform, sort, order})
    const games = gamesQueried.map(processGameData)
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

    const game = processGameData(gameQueried)
    res.json({...game, ...comment})
  } catch (error) {
    console.error('Error fetching games:', error.message)
    res.status(500).json({error: 'Failed to fetch games'})
  }
}

const fetchNewestReleaseGame = async (req, res) => {
  try {
    const newestGameQueried = await getNewestReleaseGame()
    const newestGame = {
      ...newestGameQueried,
      release_date: formatDate(newestGameQueried.release_date),
    }

    res.json(newestGame)
  } catch (error) {
    console.error('Error fetching newest release game', error.message)
    res.status(500).json({error: 'Failed to fetch newest release game'})
  }
}

export {fetchAllGames, fetchGameById, fetchNewestReleaseGame}
