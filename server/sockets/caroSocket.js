const caroSocket = io => {
  const caroRooms = {}
  io.of('/caro').on('connection', socket => {
    console.log('A user connected to Caro namespace: ', socket.id)

    socket.on('joinRoom', roomId => {
      socket.join(roomId)
      if (!caroRooms[roomId]) caroRooms[roomId] = []
      if (!caroRooms[roomId].includes(socket.id)) {
        caroRooms[roomId].push(socket.id)
      }

      if (caroRooms[roomId].length > 2) {
        socket.emit('roomFull')
      } else if (caroRooms[roomId].length === 2) {
        const [player1, player2] = caroRooms[roomId]
        io.of('/caro').to(player1).emit('assignSymbol', 'X')
        io.of('/caro').to(player2).emit('assignSymbol', 'O')
        io.of('/caro').to(roomId).emit('playerJoined', {playerId: socket.id})
      }
    })

    socket.on('makeMove', ({roomId, move}) => {
      socket.to(roomId).emit('opponentMove', move)
    })

    socket.on('resetGame', roomId => {
      io.of('/caro').to(roomId).emit('gameReset')
    })

    socket.on('changeBoardSize', ({roomId, boardSize}) => {
      io.of('/caro').to(roomId).emit('boardSizeChanged', {boardSize})
    })

    socket.on('disconnect', () => {
      for (const roomId in caroRooms) {
        caroRooms[roomId] = caroRooms[roomId].filter(id => id !== socket.id)
        if (caroRooms[roomId].length === 0) delete caroRooms[roomId]
      }
      console.log('A user disconnected from Caro: ', socket.id)
    })
  })
}

export default caroSocket
