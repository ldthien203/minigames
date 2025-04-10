import {Link} from 'react-router'
import {Fragment} from 'react'
import './PageTopSection.css'

const PageTop = ({
  title = 'Home',
  background = '../../assets/img/page-top-bg/1.jpg',
}) => {
  return (
    <Fragment>
      <section
        className={`page-top-section set-bg`}
        style={{backgroundImage: `url(${background})`}}
      >
        <div className="page-info">
          <h2>{title}</h2>
          <div className="site-breadcrumb">
            <Link to="#">Home </Link> / <span>{title}</span>
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export default PageTop
