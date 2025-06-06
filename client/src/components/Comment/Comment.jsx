import {useState} from 'react'
import useAuth from '../../hooks/useAuth'
import './Comment.css'

const Comment = ({comments, news_id, reloadNews}) => {
  const [commentText, setCommentText] = useState('')
  const {user} = useAuth()

  const handleSubmit = async e => {
    e.preventDefault()
    if (!user) return

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/news/${news_id}/comment`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            user_id: user.id,
            news_id,
            content: commentText,
          }),
        },
      )

      if (response.ok) {
        setCommentText('')
        reloadNews && reloadNews()
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
          {comments.map((comment, index) => (
            <li key={index} className="comment-item">
              <p>
                <strong>{comment.user_username}</strong> {comment.user_comment}
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
