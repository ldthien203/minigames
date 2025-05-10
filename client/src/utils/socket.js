import {io} from 'socket.io-client'

const getChessSocket = () => io('http://localhost:4000/chess')
const getCaroSocket = () => io('http://localhost:4000/caro')

export {getChessSocket, getCaroSocket}
