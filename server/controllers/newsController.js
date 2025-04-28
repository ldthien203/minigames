import {formatDate} from '../utils/gameUtils.js'
import {getAllNews} from '../models/newsModel.js'

const fetchAllNews = async (req, res) => {
  try {
    const newsQueried = await getAllNews()
    const allNews = newsQueried.map(news => ({
      ...news,
      publish_date: formatDate(news.publish_date),
    }))

    res.json(allNews)
  } catch (error) {
    console.error('Error fetching all news', error.message)
    res.status(500).json({error: 'Failed to fetch all news'})
  }
}

export {fetchAllNews}
