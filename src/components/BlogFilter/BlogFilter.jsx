import {Link} from 'react-router'
import './BlogFilter.css'

const BlogFilter = ({blogFilter = {}}) => {
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
