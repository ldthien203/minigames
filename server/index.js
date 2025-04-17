const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()
const bodyParser = require('body-parser')

const port = 4000

const app = express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', async (req, res) => {
  try {
    const tokenResponse = await axios.post(process.env.API_TOKEN, null, {
      params: {
        client_id: process.env.TWITCH_CLIENT_ID,
        client_secret: process.env.TWITCH_CLIENT_SECRET,
        grant_type: 'client_credentials',
      },
    })

    const accessToken = tokenResponse.data.access_token

    const headerConfig = {
      headers: {
        'Client-ID': process.env.TWITCH_CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'text/plain',
      },
    }

    const dataResponse = await axios.post(
      `${process.env.API_DATA}/games`,
      `fields id,genres.name,name,summary,screenshots.url,platforms.name,rating,release_dates.date;
      sort release_dates desc;
      where rating >= 50;`,
      headerConfig,
    )

    const apiData = dataResponse.data
    const dataProcessed = apiData.map(game => {
      const releaseDate =
        game.release_dates && new Date(game.release_dates[0].date * 1000)
      return {
        id: game.id,
        name: game.name,
        genres: game.genres
          ? game.genres.map(genre => genre.name).join(', ')
          : 'Unknown',
        summary: game.summary ?? 'No summary available',
        rating: game.rating ? game.rating.toFixed(2) : 'No rating',
        platforms: game.platforms
          ? game.platforms.map(platform => platform.name).join(', ')
          : 'Unknown',
        screenshot:
          game.screenshots &&
          game.screenshots?.[0]?.url.replace('t_thumb', 't_screenshot_huge'),
        release_date: releaseDate
          ? `${releaseDate.getDate()}.${
              releaseDate.getMonth() + 1
            }.${releaseDate.getFullYear()}`
          : 'Unknown',
      }
    })

    res.json(dataProcessed)
  } catch (error) {
    console.error('Error fetching games: ', error.message)
    res.status(500).json({error: 'Failed to fetch games'})
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
