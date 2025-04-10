import {Link} from 'react-router-dom'
import './LatestComment.css'

const LatestComment = () => {
  const latestCmts = [
    {
      username: 'Brock Leshnar',
      avatarImg: '1',
      title: 'The best online game out there',
    },
    {
      username: 'Roman Reign',
      avatarImg: '2',
      title: 'The best VR games on the market',
    },
    {
      username: 'Michael Jordan',
      avatarImg: '3',
      title: 'The best VR games on the market',
    },
    {
      username: 'Son Tung MTP',
      avatarImg: '4',
      title: 'The best VR games on the market',
    },
  ]

  return (
    <div className="latest-comments">
      {latestCmts.map(cmt => (
        <div className="lc-item">
          <img
            src={require(`../../../../assets/img/blog-widget/${cmt.avatarImg}.jpg`)}
            alt="lc-avatar"
            className="lc-avatar"
          />
          <div className="tw-text">
            <Link to="#">{cmt.username}</Link>
            <span> On </span>
            {cmt.title}
          </div>
        </div>
      ))}
    </div>
  )
}

export default LatestComment
