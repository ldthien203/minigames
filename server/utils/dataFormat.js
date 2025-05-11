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

export {formatDate, calcAvgRating, processGameData}
