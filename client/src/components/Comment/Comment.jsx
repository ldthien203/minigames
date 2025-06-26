import {useEffect, useState} from 'react'
import useAuth from '../../hooks/useAuth'
import './Comment.css'

const Comment = ({type, id}) => {
  const [commentText, setCommentText] = useState('')
  const [comments, setComments] = useState([])
  const {user} = useAuth()

  const fetchComments = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/comment/${type}/${id}`,
    )
    if (!response.ok) return

    const data = await response.json()
    setComments(data)
  }

  useEffect(() => {
    fetchComments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, id])

  const handleSubmit = async e => {
    e.preventDefault()
    if (!user) return

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/comment/${type}/${id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            user_id: user.id,
            target_id: id,
            target_type: type,
            content: commentText,
          }),
        },
      )

      if (response.ok) {
        setCommentText('')
        fetchComments()
      } else {
        alert('Failed to send comment')
      }
    } catch (err) {
      alert('Error sending comment')
    }
  }

  return (
    <div className="comments-section">
      <h3>User Comments</h3>
      <form onSubmit={handleSubmit}>
        {user ? (
          <>
            <textarea
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              placeholder="Write your comment...."
              disabled={!user}
            />
            <button type="submit" disabled={!user}>
              Send
            </button>
          </>
        ) : (
          <p className="comment-warning">You must be logged in to comment</p>
        )}
      </form>
      {comments && comments.length > 0 ? (
        <ul className="comments-list">
          {comments.map(comment => (
            <li key={comment.comment_id} className="comment-item">
              <p>
                <strong>{comment.username}</strong> {comment.content}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments yet. Be the first to comment</p>
      )}
    </div>
  )
}

export default Comment
