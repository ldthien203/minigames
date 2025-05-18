const chessSocket = io => {
  const chessRooms = {}
  io.of('/chess').on('connection', socket => {
    console.log('A user connected to Chess namespace: ', socket.id)

    socket.on('joinRoom', ({roomId, user}) => {
      socket.join(roomId)
      if (!chessRooms[roomId]) chessRooms[roomId] = []
      if (!chessRooms[roomId].some(u => u.id === socket.id)) {
        chessRooms[roomId].push({id: socket.id, user})
      }

      if (chessRooms[roomId].length > 2) {
        socket.emit('roomFull')
      } else if (chessRooms[roomId].length === 2) {
        const [player1, player2] = chessRooms[roomId]
        io.of('/chess').to(player1.id).emit('assignColor', {
          color: 'white',
          yourUser: player1.user,
          opponent: player2.user,
        })
        io.of('/chess').to(player2.id).emit('assignColor', {
          color: 'black',
          yourUser: player2.user,
          opponent: player1.user,
        })
        io.of('/chess').to(roomId).emit('playerJoined', {playerId: socket.id})
      }
    })

    socket.on('makeMove', ({roomId, move}) => {
      socket.to(roomId).emit('opponentMove', move)
    })

    socket.on('resetGame', roomId => {
      io.of('/chess').to(roomId).emit('gameReset')
    })

    socket.on('disconnect', () => {
      for (const roomId in chessRooms) {
        chessRooms[roomId] = chessRooms[roomId].filter(u => u.id !== socket.id)
        if (chessRooms[roomId].length === 0) delete chessRooms[roomId]
      }
      console.log('A user disconnected from Chess: ', socket.id)
    })
  })
}

export default chessSocket
