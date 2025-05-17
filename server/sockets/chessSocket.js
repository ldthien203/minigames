const chessSocket = io => {
  const chessRooms = {}
  io.of('/chess').on('connection', socket => {
    console.log('A user connected to Chess namespace: ', socket.id)

    socket.on('joinRoom', roomId => {
      socket.join(roomId)
      if (!chessRooms[roomId]) chessRooms[roomId] = []
      if (!chessRooms[roomId].includes(socket.id)) {
        chessRooms[roomId].push(socket.id)
      }

      if (chessRooms[roomId].length > 2) {
        socket.emit('roomFull')
      } else if (chessRooms[roomId].length === 2) {
        const [player1, player2] = chessRooms[roomId]
        io.of('/chess').to(player1).emit('assignColor', 'white')
        io.of('/chess').to(player2).emit('assignColor', 'black')
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
        chessRooms[roomId] = chessRooms[roomId].filter(id => id !== socket.id)
        if (chessRooms[roomId].length === 0) delete chessRooms[roomId]
      }
      console.log('A user disconnected from Chess: ', socket.id)
    })
  })
}

export default chessSocket
