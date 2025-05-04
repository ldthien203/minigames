import {formatDate} from '../utils/gameUtils.js'
import {getAllNews, getNewsById, getAllNewsType} from '../models/newsModel.js'

const fetchAllNews = async (req, res) => {
  try {
    const newsQueried = await getAllNews()
    const allNews = newsQueried.map(news => ({
      ...news,
      publish_date: formatDate(news.publish_date),
    }))

    res.json(allNews)
  } catch (error) {
    console.error('Error fetching all news:', error.message)
    res.status(500).json({error: 'Failed to fetch all news'})
  }
}

const fetchNewsById = async (req, res) => {
  const id = req.params.id
  try {
    const queriedNews = await getNewsById(id)
    const news = {
      ...queriedNews,
      published_at: formatDate(queriedNews.published_at),
    }

    res.json(news)
  } catch (error) {
    console.error('Error fetching news by id:', error.message)
    res.status(500).json({error: 'Failed to fetch news by id'})
  }
}

const fetchAllNewsType = async (req, res) => {
  try {
    const queriedNewsType = await getAllNewsType()
    res.json(queriedNewsType)
  } catch (error) {
    console.error('Error fetching all news type:', error.message)
    res.status(500).json({error: 'Failed to fetch all news type'})
  }
}

export {fetchAllNews, fetchNewsById, fetchAllNewsType}
