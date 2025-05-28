import {io} from 'socket.io-client'

let chessSocket = null
let caroSocket = null

const getChessSocket = () => {
  if (!chessSocket) chessSocket = io(`${process.env.REACT_APP_API_URL}/chess`)
  return chessSocket
}

const getCaroSocket = () => {
  if (!caroSocket) caroSocket = io(`${process.env.REACT_APP_API_URL}/caro`)
  return caroSocket
}

export {getChessSocket, getCaroSocket}
