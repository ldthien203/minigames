import {io} from 'socket.io-client'

let chessSocket = null
let caroSocket = null

const getChessSocket = () => {
  if (!chessSocket) chessSocket = io('http://localhost:4000/chess')
  return chessSocket
}

const getCaroSocket = () => {
  if (!caroSocket) caroSocket = io('http://localhost:4000/caro')
  return caroSocket
}

export {getChessSocket, getCaroSocket}
