import {Link} from 'react-router'
import {Fragment, useState, useEffect} from 'react'
import './PageTopSection.css'

const dataByPath = {
  '/': {title: '', background: '../../assets/img/page-top-bg/1.jpg'},
  '/games': {title: 'Games', background: '../../assets/img/page-top-bg/1.jpg'},
  '/games/minigames': {
    title: 'Minigames',
    background: '../../assets/img/page-top-bg/1.jpg',
  },
  '/games/minigames/caro': {
    title: 'Caro',
    background: '../../assets/img/page-top-bg/1.jpg',
  },
  '/games/minigames/chess': {
    title: 'Chess',
    background: '../../assets/img/page-top-bg/1.jpg',
  },
  '/reviews': {
    title: 'Reviews',
    background: '../../assets/img/page-top-bg/2.jpg',
  },
  '/news': {title: 'News', background: '../../assets/img/page-top-bg/3.jpg'},
  '/contact': {
    title: 'Contact',
    background: '../../assets/img/page-top-bg/4.jpg',
  },
}

const PageTop = ({path = '/'}) => {
  const [isShowBg, setIsShowbg] = useState(false)
  const {title = '', background = '../../assets/img/page-top-bg/1.jpg'} =
    dataByPath[path] ?? {}

  useEffect(() => {
    setIsShowbg(path !== '/')
  }, [path])

  return (
    <Fragment>
      {isShowBg && (
        <section
          className={`page-top-section set-bg`}
          style={{backgroundImage: `url(${background})`}}
        >
          <div className="page-info">
            <h2>{title}</h2>
            <div className="site-breadcrumb">
              <Link to="/">Home </Link> / <span>{title ?? ''}</span>
            </div>
          </div>
        </section>
      )}
    </Fragment>
  )
}

export default PageTop
