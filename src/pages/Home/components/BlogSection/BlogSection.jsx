import Category from '../../../../components/Category/Category'
import IntroCard from '../../../../components/IntroCard/IntroCard'
import MiniCard from './components/MiniCard/MiniCard'
import {Link} from 'react-router'
import './BlogSection.css'

const BlogSection = () => {
  return (
    <section className="blog-section">
      <div className="container">
        <div className="row">
          <div className="col-1">
            <div className="section-title">
              <h2>Lastest News</h2>
            </div>
            <ul className="blog-filter">
              <li>
                <Link to="#">Racing</Link>
              </li>
              <li>
                <Link to="#">Shooters</Link>
              </li>
              <li>
                <Link to="#">Strategy</Link>
              </li>
              <li>
                <Link to="#">Online</Link>
              </li>
            </ul>
            <div className="blog-item">
              <IntroCard
                category="Games"
                title="The best online game is out now!"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eius-mod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Lorem ipsum dolor sit amet, consecte-tur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua....."
                isShowImg={true}
                img={1}
              />
            </div>
            <div className="blog-item">
              <IntroCard
                category="Games"
                title="The best online game is out now!"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eius-mod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Lorem ipsum dolor sit amet, consecte-tur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua....."
                isShowImg={true}
                img={2}
              />
            </div>
            <div className="blog-item">
              <IntroCard
                category="Games"
                title="The best online game is out now!"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eius-mod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Lorem ipsum dolor sit amet, consecte-tur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua....."
                isShowImg={true}
                img={3}
              />
            </div>
          </div>
          <div className="col-2">
            <div id="stickSidebar">
              <div className="inner-wrapper-sticky">
                <div className="widget-item">
                  <h4 className="widget-title">Trending</h4>
                  <div className="trending-widget">
                    <div className="tw-item">
                      <MiniCard
                        title="The best online game is out now!"
                        category="Games"
                      />
                    </div>
                    <div className="tw-item">
                      <MiniCard
                        title="The best online game is out now!"
                        category="Games"
                        img={2}
                      />
                    </div>
                    <div className="tw-item">
                      <MiniCard
                        title="The best online game is out now!"
                        category="Games"
                        img={3}
                      />
                    </div>
                    <div className="tw-item">
                      <MiniCard
                        title="The best online game is out now!"
                        category="Games"
                        img={4}
                      />
                    </div>
                  </div>
                </div>
                <div className="widget-item">
                  <Category
                    title="Categories"
                    items={[
                      'Games',
                      'Gaming Tips & Tricks',
                      'Online Games',
                      'Team Games',
                      'Community',
                      'Uncategorized',
                    ]}
                  />
                </div>
                <div className="widget-item">
                  <Link to="#" className="add">
                    <img
                      src={require('../../../../assets/img/add.jpg')}
                      alt="add"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BlogSection
