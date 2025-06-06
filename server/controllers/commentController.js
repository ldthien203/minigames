import {getComments, addComment} from '../models/commentModel.js'
import {formatDate} from '../utils/dataFormat.js'

const fetchGetComments = async (req, res) => {
  const {id, type} = req.params
  try {
    const queriedCmt = await getComments(id, type)

    res.status(200).json(queriedCmt)
  } catch (error) {
    console.error('Error fetching get comment: ', error.message)
    res.status(500).json({error: 'Failed to fetch get comment'})
  }
}

const fetchAddComment = async (req, res) => {
  const {user_id, target_id, target_type, content} = req.body
  try {
    const queriedCmt = await addComment(
      user_id,
      target_id,
      target_type,
      content,
    )
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

export {fetchGetComments, fetchAddComment}
