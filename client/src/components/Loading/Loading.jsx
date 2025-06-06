import './Loading.css'

const Loading = ({message = 'Loading ...'}) => {
  return (
    <div className="loading-container">
      <div className="spinner" />
      <span className="loading message">{message}</span>
    </div>
  )
}

export default Loading
