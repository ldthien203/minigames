import {Fragment} from 'react'
import Category from '../../../../components/Category/Category'
import SitePagination from '../../../../components/SitePagination/SitePagination'
import StickSidebar from '../../../../components/StickSidebar/StickSidebar'
import WidgetItem from '../../../../components/WidgetItem/WidgetItem'
import GameItem from '../GameItem/GameItem'
import './GameSection.css'

const gameItems = [
  {
    id: 1,
    title: 'Zombie Appocalipse 2',
    image: '../../../../assets/img/games/1.jpg',
    link: '#',
  },
  {title: 'Dooms Day', image: '../../../../assets/img/games/2.jpg', link: '#'},
  {
    id: 2,
    title: 'The Huricane',
    image: '../../../../assets/img/games/3.jpg',
    link: '#',
  },
  {
    id: 3,
    title: 'Star Wars',
    image: '../../../../assets/img/games/4.jpg',
    link: '#',
  },
  {
    id: 4,
    title: 'Candyy Land',
    image: '../../../../assets/img/games/5.jpg',
    link: '#',
  },
  {
    id: 5,
    title: 'E.T.',
    image: '../../../../assets/img/games/6.jpg',
    link: '#',
  },
  {
    id: 6,
    title: 'Zombie Appocalipse 2',
    image: '../../../../assets/img/games/7.jpg',
    link: '#',
  },
  {
    id: 7,
    title: 'Dooms Day',
    image: '../../../../assets/img/games/8.jpg',
    link: '#',
  },
  {
    id: 8,
    title: 'The Huricane',
    image: '../../../../assets/img/games/9.jpg',
    link: '#',
  },
]

const categoryItems = [
  {
    title: 'Categories',
    items: [
      'Games',
      'Gaming Tips & Tricks',
      'Online Games',
      'Team Games',
      'Community',
      'Uncategorized',
    ],
  },
  {
    title: 'Flatform',
    items: [
      'Xbox',
      'X box 360',
      'Play Station',
      'Play Station VR',
      'Nintendo Wii',
      'Nintendo Wii U',
    ],
  },
  {
    title: 'Genre',
    items: ['Online', 'Adventure', 'S.F.', 'Strategy', 'Racing', 'Shooter'],
  },
]

const GameSection = () => {
  return (
    <Fragment>
      <section className="games-section">
        <div className="container">
          <div className="row">
            <div className="col-1">
              <div className="row">
                {gameItems.map(item => (
                  <div key={item.id} className="child-col">
                    <GameItem title={item.title} image={item.image} />
                  </div>
                ))}
              </div>
              <SitePagination />
            </div>
            <div className="col-2">
              <StickSidebar>
                {categoryItems.map(item => (
                  <WidgetItem key={item.title}>
                    <Category title={item.title} items={item.items} />
                  </WidgetItem>
                ))}
              </StickSidebar>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export default GameSection
