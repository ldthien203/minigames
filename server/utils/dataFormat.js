import fs from 'fs'
import path from 'path'

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

const capializeFirstLetter = str => str.charAt(0).toUpperCase() + str.slice(1)

const deleteFile = filePath => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
      console.log(`Deleted file: ${filePath}`)
    }
  } catch (error) {
    console.log(`Error deleting file: ${filePath}`, error.message)
  }
}

export {
  formatDate,
  calcAvgRating,
  processGameData,
  capializeFirstLetter,
  deleteFile,
}
