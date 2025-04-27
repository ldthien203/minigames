import {
  getAllGames,
  getGameById,
  getGameCommentAuthor,
  getNewestReleaseGame,
  getGamesForGames,
  getGamesForReview,
} from '../models/gameModel.js'

const formatDate = date => {
  return new Date(date)
    .toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    .replaceAll('/', '.')
}

const calcAvgRating = (price, graphics, levels, gameplay, soundtrack) => {
  return (
    (Number(price) +
      Number(graphics) +
      Number(levels) +
      Number(gameplay) +
      Number(soundtrack)) /
    5
  )
}

const processGameData = game => {
  return {
    ...game,
    release_date: formatDate(game.release_date),
    avg_price: Number(game.avg_price),
    avg_graphics: Number(game.avg_graphics),
    avg_levels: Number(game.avg_levels),
    avg_gameplay: Number(game.avg_gameplay),
    avg_soundtrack: Number(game.avg_soundtrack),
    avg_rating: calcAvgRating(
      game.avg_gameplay,
      game.avg_graphics,
      game.avg_levels,
      game.avg_price,
      game.avg_soundtrack,
    ),
  }
}

const fetchAllGames = async (req, res) => {
  try {
    const gamesQueried = await getAllGames()
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

const fetchGamesForGames = async (req, res) => {
  try {
    const gamesQueried = await getGamesForGames()
    res.json(gamesQueried)
  } catch (error) {
    console.error('Error fetching games for game pages', error.message)
    res.status(500).json({error: 'Failed to fetch games for game pages'})
  }
}

const fetchGamesForReview = async (req, res) => {
  try {
    const gamesQueried = await getGamesForReview()
    const games = gamesQueried.map(processGameData)

    res.json(games)
  } catch (error) {
    console.error('Error fetching games for review pages', error.message)
    res.status(500).json({error: 'Failed to fetch games for review pages'})
  }
}

export {
  fetchAllGames,
  fetchGameById,
  fetchNewestReleaseGame,
  fetchGamesForGames,
  fetchGamesForReview,
}
