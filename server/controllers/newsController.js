import {formatDate} from '../utils/dataFormat.js'
import {
  getAllNews,
  getNewsById,
  getAllNewsType,
  getTrendingNews,
  updateViewCount,
} from '../models/newsModel.js'

const fetchGetAllNews = async (req, res) => {
  const type = req.query.type
  try {
    const newsQueried = await getAllNews({type})
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

const fetchGetNewsById = async (req, res) => {
  const id = req.params.id
  try {
    const queriedNews = await getNewsById(id)
    const news = {
      ...queriedNews,
      publish_date: formatDate(queriedNews.publish_date),
    }

    res.json(news)
  } catch (error) {
    console.error('Error fetching news by id:', error.message)
    res.status(500).json({error: 'Failed to fetch news by id'})
  }
}

const fetchGetAllNewsType = async (req, res) => {
  try {
    const queriedNewsType = await getAllNewsType()

    res.json(queriedNewsType)
  } catch (error) {
    console.error('Error fetching all news type:', error.message)
    res.status(500).json({error: 'Failed to fetch all news type'})
  }
}

const fetchGetTrendingNews = async (req, res) => {
  const limit = req.query.limit || 4
  try {
    const queriedTrendingNews = await getTrendingNews(limit)
    const trendingNews = queriedTrendingNews.map(news => ({
      ...news,
      publish_date: formatDate(news.publish_date),
    }))

    res.json(trendingNews)
  } catch (error) {
    console.error('Error fetching trending news:', error.message)
    res.status(500).json({error: 'Failed to fetch trending news'})
  }
}

const fetchUpdateViewCount = async (req, res) => {
  const id = req.params.id
  try {
    await updateViewCount(id)
    res.status(200).json({success: true})
  } catch (error) {
    console.error('Error fetching update view count: ', error.message)
    res.status(500).json({error: 'Failed to fetch update view count'})
  }
}

export {
  fetchGetAllNews,
  fetchGetNewsById,
  fetchGetAllNewsType,
  fetchGetTrendingNews,
  fetchUpdateViewCount,
}
