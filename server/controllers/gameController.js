import {formatDate, processGameData} from '../utils/dataFormat.js'
import {
  getAllGames,
  getGameById,
  getNewestReleaseGame,
} from '../models/gameModel.js'

const fetchGetAllGames = async (req, res) => {
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

const fetchGetGameById = async (req, res) => {
  const id = req.params.id
  try {
    const gameQueried = await getGameById(id)
    const game = processGameData(gameQueried)
    res.json(game)
  } catch (error) {
    console.error('Error fetching games:', error.message)
    res.status(500).json({error: 'Failed to fetch games'})
  }
}

const fetchGetNewestReleaseGame = async (req, res) => {
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

export {fetchGetAllGames, fetchGetGameById, fetchGetNewestReleaseGame}
