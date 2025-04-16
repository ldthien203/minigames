import './StickSidebar.css'

// const StickSidebar = ({isShowLatestCmt = false}) => {
//   return (
//     <div id="stickSidebar">
//       <div className="inner-wrapper-sticky">
//         <WidgetItem>
//           <h4 className="widget-title">Trending</h4>
//           <TrendingWidget />
//         </WidgetItem>
//         <WidgetItem>
//           <Category title="Categories" items={itemInCategory} />
//         </WidgetItem>
//         {isShowLatestCmt && (
//           <WidgetItem>
//             <h4 className="widget-title">Latest comment</h4>
//             <LatestComment />
//           </WidgetItem>
//         )}
//         <WidgetItem>
//           <Link to="#" className="add">
//             <img src={add} alt="add" />
//           </Link>
//         </WidgetItem>
//       </div>
//     </div>
//   )
// }

const StickSidebar = ({children}) => {
  return (
    <div id="stickSidebar">
      <div className="inner-wrapper-sticky">{children}</div>
    </div>
  )
}

export default StickSidebar
