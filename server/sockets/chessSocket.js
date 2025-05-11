const chessSocket = io => {
  const chessRooms = {}
  io.of('/chess').on('connection', socket => {
    console.log('A user connected to Chess namespace: ', socket.id)

    socket.on('joinRoom', roomId => {
      socket.join(roomId)
      if (!chessRooms[roomId]) chessRooms[roomId] = []
      if (!chessRooms[roomId].includes(socket.id)) {
        chessRooms[roomId].push(socket.id)
        socket.to(roomId).emit('playerJoined', {playerId: socket.id})
      }
    })

    socket.on('requestColor', roomId => {
      const players = chessRooms[roomId] || []
      let color = 'black'
      if (players[0] === socket.id) color = 'white'
      socket.emit('assignColor', color)
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
