const express = require('express')
const cors = require('cors')

const port = 4000

const app = express()
app.use(cors())

app.get('/api', (req, res) => {
  res.json({users: ['userOne', 'userTwo', 'userThree']})
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
