import {isPlayerTurn} from './gameStatus'
import {isValidMove, simulateMove} from './movementLogic'

const findAttackers = (board, kingPos, color) => {
  const [kingX, kingY] = kingPos
  const opponentColor = color === 'white' ? 'black' : 'white'

  return board
    .flatMap((row, x) =>
      row.map((piece, y) => {
        if (
          isPlayerTurn(piece, opponentColor) &&
          isValidMove(piece, x, y, kingX, kingY, board)
        ) {
          return [x, y]
        }
        return null
      }),
    )
    .filter(Boolean)
}

const findKing = (board, color) => {
  const kingSymbol = color === 'white' ? 'K' : 'k'

  const positions = board.flatMap((row, i) => row.map((_, j) => [i, j]))

  return positions.find(([i, j]) => board[i][j] === kingSymbol) || null
}

const isKingInCheck = (board, color) => {
  const opponentColor = color === 'white' ? 'black' : 'white'
  const kingPos = findKing(board, color)
  if (!kingPos) return false

  const [kingX, kingY] = kingPos

  return board.some((row, x) =>
    row.some(
      (_, y) =>
        isPlayerTurn(board[x][y], opponentColor) &&
        isValidMove(board[x][y], x, y, kingX, kingY, board),
    ),
  )
}

const getKingValidMoves = (board, kingPos, color) => {
  const [kingX, kingY] = kingPos
  const moves = [
    [kingX - 1, kingY - 1],
    [kingX - 1, kingY],
    [kingX - 1, kingY + 1],
    [kingX, kingY - 1],
    [kingX, kingY + 1],
    [kingX + 1, kingY - 1],
    [kingX + 1, kingY],
    [kingX + 1, kingY + 1],
  ]

  return moves.filter(([x, y]) => {
    if (x < 0 || y < 0 || x >= board.length || y >= board[0].length)
      return false

    const newBoard = simulateMove(board, kingX, kingY, x, y)
    return !isKingInCheck(newBoard, color)
  })
}

const getBlockingMoves = (board, attackerPos, kingPos, color) => {
  const [attackerX, attackerY] = attackerPos
  const [kingX, kingY] = kingPos

  const path = []
  let x = attackerX
  let y = attackerY

  const stepX =
    kingX === attackerX ? 0 : (kingX - attackerX) / Math.abs(kingX - attackerX)

  const stepY =
    kingY === attackerY ? 0 : (kingY - attackerY) / Math.abs(kingY - attackerY)

  while (x !== kingX && y !== kingY) {
    x += stepX
    y += stepY
    path.push([x, y])
  }

  return path.filter(([x, y]) => {
    return board.some((row, i) =>
      row.some((_, j) => isValidMove(board[i][j], i, j, x, y, board)),
    )
  })
}

const getCaptureMoves = (board, attackerPos, color) => {
  const [attackerX, attackerY] = attackerPos

  return board
    .flatMap((row, x) =>
      row.map((_, y) => {
        if (isValidMove(board[x][y], x, y, attackerX, attackerY, board)) {
          return [x, y]
        }
        return null
      }),
    )
    .filter(Boolean)
}

const getAllKingValidMoves = (board, color) => {
  const kingPos = findKing(board, color)
  if (!kingPos) return []

  const attackers = findAttackers(board, kingPos, color)
  if (attackers.length === 0) return []

  const validMoves = []

  validMoves.push(...getKingValidMoves(board, kingPos, color))

  if (attackers.length === 1) {
    const attackerPos = attackers[0]
    validMoves.push(...getBlockingMoves(board, attackerPos, kingPos, color))
    validMoves.push(...getCaptureMoves(board, attackerPos, kingPos, color))
  }

  return validMoves
}

export {findKing, isKingInCheck, getAllKingValidMoves}
