import express from require('express')
import cors from require('cors')
import pg from require('pg')
import axios from require('axios')
require('dotenv').config()
import bodyParser from require('body-parser')

const port = 4000
const app = express()

const db = new pg.Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
})

db.connect()

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * from games')
    res.json(result.rows)
  } catch (error) {
    console.error('Error fetching games:', error.message)
    res.status(500).json({ error: 'Failed to fetch games' })
  }
})

app.get('/games', async (req, res) => {})

app.get('/games/:id', async (req, res) => {})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
