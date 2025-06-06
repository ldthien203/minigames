import {formatDate} from '../utils/dataFormat.js'
import {
  getAllNews,
  getNewsById,
  getAllNewsType,
  getTrendingNews,
  getLatestComment,
  updateViewCount,
  addNewsComment,
} from '../models/newsModel.js'

const fetchAllNews = async (req, res) => {
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

const fetchNewsById = async (req, res) => {
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

const fetchAllNewsType = async (req, res) => {
  try {
    const queriedNewsType = await getAllNewsType()

    res.json(queriedNewsType)
  } catch (error) {
    console.error('Error fetching all news type:', error.message)
    res.status(500).json({error: 'Failed to fetch all news type'})
  }
}

const fetchTrendingNews = async (req, res) => {
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

const fetchLatestComment = async (req, res) => {
  try {
    const queriedCmt = await getLatestComment()
    const comment = queriedCmt.map(cmt => ({
      ...cmt,
      created_at: formatDate(cmt.created_at),
    }))

    res.status(200).json(comment)
  } catch (error) {
    console.error('Error fetching latest comment: ', error.message)
    res.status(500).json({error: 'Failed to fetch latest comment'})
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

const fetchAddNewsComment = async (req, res) => {
  const {user_id, news_id, content} = req.body
  try {
    const queriedCmt = await addNewsComment(user_id, news_id, content)
    const comment = queriedCmt.map(cmt => ({
      ...cmt,
      created_at: formatDate(cmt.created_at),
    }))

    res.status(200).json(comment)
  } catch (error) {
    console.error('Error fetching add news comment: ', error.message)
    res.status(500).json({error: 'Failed to fetch add news comment'})
  }
}

export {
  fetchAllNews,
  fetchNewsById,
  fetchAllNewsType,
  fetchTrendingNews,
  fetchLatestComment,
  fetchUpdateViewCount,
  fetchAddNewsComment,
}
