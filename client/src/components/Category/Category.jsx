import {Link} from 'react-router'
import './Category.css'

const Category = ({
  title = 'Default Category',
  items = [],
  queryKey = 'category',
  onSelect = null,
}) => {
  return (
    <div className="categories-widget">
      <h4 className="widget-title">{title}</h4>
      <ul>
        {items.map(item => {
          const query = `${queryKey}=${encodeURIComponent(item.toLowerCase())}`
          return (
            <li key={item} onClick={() => onSelect(item)}>
              <Link to={`?${query}`}>
                {item}
                <img
                  src="/assets/img/icons/double-arrow.png"
                  alt="Double Arrow"
                />
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Category
