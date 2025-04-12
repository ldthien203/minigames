import './WidgetItem.css'

const WidgetItem = ({isShowTitle = false, title, children}) => {
  return (
    <div className="widget-item">
      {isShowTitle && <h4 className="widget-title">{title}</h4>}
      {children}
    </div>
  )
}

export default WidgetItem
