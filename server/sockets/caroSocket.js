const caroSocket = io => {
  const caroRooms = {}
  io.of('/caro').on('connection', socket => {
    console.log('A user connected to Caro namespace: ', socket.id)

    socket.on('joinRoom', ({roomId, user}) => {
      socket.join(roomId)
      if (!caroRooms[roomId]) caroRooms[roomId] = []
      // if (!caroRooms[roomId].includes(socket.id)) {
      if (!caroRooms[roomId].some(u => u.id === socket.id)) {
        caroRooms[roomId].push({id: socket.id, user})
      }

      if (caroRooms[roomId].length > 2) {
        socket.emit('roomFull')
      } else if (caroRooms[roomId].length === 2) {
        const [player1, player2] = caroRooms[roomId]
        io.of('/caro').to(player1.id).emit('assignSymbol', {
          symbol: 'X',
          yourUser: player1.user,
          opponent: player2.user,
        })
        io.of('/caro').to(player2.id).emit('assignSymbol', {
          symbol: 'O',
          yourUser: player2.user,
          opponent: player1.user,
        })
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
        caroRooms[roomId] = caroRooms[roomId].filter(u => u.id !== socket.id)
        if (caroRooms[roomId].length === 0) delete caroRooms[roomId]
      }
      console.log('A user disconnected from Caro: ', socket.id)
    })
  })
}

export default caroSocket
