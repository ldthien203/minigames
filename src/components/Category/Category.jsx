import {Link} from 'react-router'
import './Category.css'

const Category = ({title, items = []}) => {
  return (
    <div className="categories-widget">
      <h4 className="widget-title">{title}</h4>
      <ul>
        {items.map(item => {
          return (
            <li>
              <Link to="#">{item}</Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Category
