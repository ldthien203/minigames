import {Link} from 'react-router-dom'
import './LatestComment.css'

const latestCmts = [
  {
    username: 'Brock Leshnar',
    avatarImg: '../../../../assets/img/blog-widget/1.jpg',
    title: 'The best online game out there',
  },
  {
    username: 'Roman Reign',
    avatarImg: '../../../../assets/img/blog-widget/2.jpg',
    title: 'The best VR games on the market',
  },
  {
    username: 'Michael Jordan',
    avatarImg: '../../../../assets/img/blog-widget/3.jpg',
    title: 'The best VR games on the market',
  },
  {
    username: 'Son Tung MTP',
    avatarImg: '../../../../assets/img/blog-widget/4.jpg',
    title: 'The best VR games on the market',
  },
]

const LatestComment = () => {
  return (
    <div className="latest-comments">
      {latestCmts.map(cmt => (
        <div key={cmt.username} className="lc-item">
          <img src={cmt.avatarImg} alt="lc-avatar" className="lc-avatar" />
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
