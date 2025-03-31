import {useState} from 'react'
import './IntroVideoSection.css'

const IntroVideoSection = () => {
  const [isShowVid, setIsShowVid] = useState(false)

  const handleShowVideo = () => {
    setIsShowVid(!isShowVid)
  }

  return (
    <section className="intro-video-section">
      <button className="video-play-btn" onClick={handleShowVideo}>
        <img
          src={require('../../../../assets/img/icons/solid-right-arrow.png')}
          alt="arrow icon"
        />
      </button>
      {isShowVid && (
        <div className="overlay-part">
          <div className="video-container">
            <button
              type="button"
              title="Close (Esc)"
              className="close-video"
              onClick={handleShowVideo}
            >
              x
            </button>
            <iframe
              className="video"
              src="https://www.youtube.com/embed/gcf9FM4TbN4"
              title="Promo video"
            ></iframe>
          </div>
        </div>
      )}
      <div className="text-container">
        <div className="video-text">
          <h2>Promo video of the game</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt.
          </p>
        </div>
      </div>
    </section>
  )
}

export default IntroVideoSection
