import {Link} from 'react-router'
import './BlogFilter.css'

const blogFilter = [
  {id: 1, link: '#', name: 'Racing'},
  {id: 2, link: '#', name: 'Shooters'},
  {id: 3, link: '#', name: 'Strategy'},
  {id: 4, link: '#', name: 'Online'},
]

const BlogFilter = () => {
  return (
    <ul className="blog-filter">
      {blogFilter.map(blog => (
        <li key={blog.id}>
          <Link to={blog.link}>{blog.name}</Link>
        </li>
      ))}
    </ul>
  )
}

export default BlogFilter
