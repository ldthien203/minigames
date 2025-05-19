import {initialBoard} from './boardInit'
import pieceMap from './piece'
import {
  isPlayerTurn,
  isSameColor,
  isCheckmate,
  checkKingStatus,
} from './gameStatus'
import {findKing, isKingInCheck, getAllKingValidMoves} from './kingLogic'
import {isValidMove, getValidMoves, simulateMove} from './movementLogic'

export {
  initialBoard,
  pieceMap,
  isPlayerTurn,
  isSameColor,
  isCheckmate,
  checkKingStatus,
  findKing,
  isKingInCheck,
  getAllKingValidMoves,
  isValidMove,
  getValidMoves,
  simulateMove,
}
