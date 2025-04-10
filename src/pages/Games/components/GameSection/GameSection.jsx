import {Fragment} from 'react'
import './GameSection.css'
import Category from '../../../../components/Category/Category'
import SitePagination from '../../../../components/SitePagination/SitePagination'
import GameItem from '../GameItem/GameItem'

const GameSection = () => {
  const gameItems = [
    {title: 'Zombie Appocalipse 2', image: 1, link: '#'},
    {title: 'Dooms Day', image: 2, link: '#'},
    {title: 'The Huricane', image: 3, link: '#'},
    {title: 'Star Wars', image: 4, link: '#'},
    {title: 'Candyy Land', image: 5, link: '#'},
    {title: 'E.T.', image: 6, link: '#'},
    {title: 'Zombie Appocalipse 2', image: 7, link: '#'},
    {title: 'Dooms Day', image: 8, link: '#'},
    {title: 'The Huricane', image: 9, link: '#'},
  ]

  return (
    <Fragment>
      <section className="games-section">
        <div className="container">
          <div className="row">
            <div className="col-1">
              <div className="row">
                {gameItems.map(item => (
                  <div key={item.title} className="child-col">
                    <GameItem title={item.title} image={item.image} />
                  </div>
                ))}
              </div>
              <SitePagination />
            </div>
            <div className="col-2">
              <div id="stickySidebar">
                <div className="inner-wrapper-sticky">
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
                    <Category
                      title="Flatform"
                      items={[
                        'Xbox',
                        'X box 360',
                        'Play Station',
                        'Play Station VR',
                        'Nintendo Wii',
                        'Nintendo Wii U',
                      ]}
                    />
                  </div>
                  <div className="widget-item">
                    <Category
                      title="Genre"
                      items={[
                        'Online',
                        'Adventure',
                        'S.F.',
                        'Strategy',
                        'Racing',
                        'Shooter',
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export default GameSection
