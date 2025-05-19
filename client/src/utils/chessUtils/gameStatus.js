import {findKing, isKingInCheck, getAllKingValidMoves} from './kingLogic'

const isPlayerTurn = (piece, turn) => {
  if (!piece) return false
  return turn === 'white'
    ? piece === piece.toUpperCase()
    : piece === piece.toLowerCase()
}

const isSameColor = (piece1, piece2) => {
  if (!piece1 || !piece2) return false
  const isUpper1 = piece1 === piece1.toUpperCase()
  const isUpper2 = piece2 === piece2.toUpperCase()
  return isUpper1 === isUpper2
}

const isCheckmate = (board, color) => {
  const validMoves = getAllKingValidMoves(board, color)
  return validMoves.length === 0
}

const checkKingStatus = (board, color) => {
  if (isKingInCheck(board, color)) {
    return findKing(board, color)
  }
  return null
}

export {isPlayerTurn, isSameColor, isCheckmate, checkKingStatus}
