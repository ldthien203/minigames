import './StickSidebar.css'

const StickSidebar = ({children}) => {
  return (
    <div id="stickSidebar">
      <div className="inner-wrapper-sticky">{children}</div>
    </div>
  )
}

export default StickSidebar
