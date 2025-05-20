import {isPlayerTurn, isSameColor} from './gameStatus'
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

  return moves
    .filter(([x, y]) => {
      if (x < 0 || y < 0 || x >= board.length || y >= board[0].length) {
        return false
      }

      if (board[x][y] && isSameColor(board[kingX][kingY], board[x][y])) {
        return false
      }

      const newBoard = simulateMove(board, kingX, kingY, x, y)
      return !isKingInCheck(newBoard, color)
    })
    .map(([x, y]) => [kingX, kingY, x, y])
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

  while (x !== kingX || y !== kingY) {
    x += stepX
    y += stepY
    path.push([x, y])
  }

  const blockingMoves = []

  path.forEach(([toX, toY]) => {
    board.forEach((row, fromX) => {
      row.forEach((piece, fromY) => {
        if (
          piece &&
          isPlayerTurn(piece, color) &&
          isValidMove(piece, fromX, fromY, toX, toY, board)
        ) {
          blockingMoves.push([fromX, fromY, toX, toY])
        }
      })
    })
  })

  return blockingMoves
}

const getCaptureMoves = (board, attackerPos, color) => {
  const [attackerX, attackerY] = attackerPos

  const captures = []

  board.forEach((row, fromX) => {
    row.forEach((piece, fromY) => {
      if (
        piece &&
        isPlayerTurn(piece, color) &&
        isValidMove(piece, fromX, fromY, attackerX, attackerY, board)
      ) {
        captures.push([fromX, fromY, attackerX, attackerY])
      }
    })
  })

  return captures
}

const getAllValidMovesWhenChecked = (board, color) => {
  const kingPos = findKing(board, color)
  if (!kingPos) return []

  const attackers = findAttackers(board, kingPos, color)
  if (attackers.length === 0) return []

  const validMoves = []

  validMoves.push(...getKingValidMoves(board, kingPos, color))
  const attackerPos = attackers[0]

  const blockingMoves = getBlockingMoves(board, attackerPos, kingPos, color)
  validMoves.push(...blockingMoves)

  const captureMoves = getCaptureMoves(board, attackerPos, color)
  validMoves.push(...captureMoves)

  return validMoves.filter(([fromX, fromY, toX, toY]) => {
    const simulatedBoard = simulateMove(board, fromX, fromY, toX, toY)
    return !isKingInCheck(simulatedBoard, color)
  })
}

export {findKing, isKingInCheck, getAllValidMovesWhenChecked}
