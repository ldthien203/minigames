import './Footer.css'

const Footer = () => {
  return (
    <footer>
      <p className="text-sm">
        &copy; {new Date().getFullYear()} My website. All rights reserved
      </p>
    </footer>
  )
}

export default Footer
