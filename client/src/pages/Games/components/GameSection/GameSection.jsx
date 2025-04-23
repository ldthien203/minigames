import {Fragment, useState, useEffect} from 'react'
import Category from '../../../../components/Category/Category'
import SitePagination from '../../../../components/SitePagination/SitePagination'
import StickSidebar from '../../../../components/StickSidebar/StickSidebar'
import WidgetItem from '../../../../components/WidgetItem/WidgetItem'
import GameItem from '../GameItem/GameItem'
import useGameData from '../../../../hooks/useGameData'
import './GameSection.css'

const GameSection = () => {
  const data = useGameData()

  const [category, setCategory] = useState([])
  const [platform, setPlatform] = useState([])

  useEffect(() => {
    const fetchAllCategory = async (req, res) => {
      try {
        const response = await fetch('http://localhost:4000/category')
        const data = await response.json()
        setCategory(data)
      } catch (error) {
        console.error('Error fetching all category')
      }
    }
    fetchAllCategory()
  }, [])

  useEffect(() => {
    const fetchAllFlatform = async (req, res) => {
      try {
        const response = await fetch('http://localhost:4000/platform')
        const data = await response.json()
        setPlatform(data)
      } catch (error) {
        console.error('Error fetching all platform')
      }
    }
    fetchAllFlatform()
  }, [])

  return (
    <Fragment>
      <section className="games-section">
        <div className="container">
          <div className="row">
            <div className="col-1">
              <div className="row">
                {data.map(item => (
                  <div key={item.game_id} className="child-col">
                    <GameItem
                      id={item.game_id}
                      title={item.name}
                      image={item.thumbnail}
                    />
                  </div>
                ))}
              </div>
              <SitePagination />
            </div>
            <div className="col-2">
              <StickSidebar>
                <WidgetItem key="category">
                  {category && (
                    <Category
                      title="Category"
                      items={category.map(c => c.name)}
                    />
                  )}
                </WidgetItem>

                <WidgetItem key="platform">
                  {platform && (
                    <Category
                      title="Platform"
                      items={platform.map(p => p.name)}
                    />
                  )}
                </WidgetItem>
              </StickSidebar>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export default GameSection
