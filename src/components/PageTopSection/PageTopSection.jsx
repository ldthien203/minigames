import {Link} from 'react-router'
import {Fragment} from 'react'
import './PageTopSection.css'

const PageTop = ({title = 'Home', background = 'reviews'}) => {
  return (
    <Fragment>
      <section className={`page-top-section set-bg ${background}`}>
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
