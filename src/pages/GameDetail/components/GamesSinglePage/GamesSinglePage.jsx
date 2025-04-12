import {Link} from 'react-router-dom'
import IconLink from '../../../../components/IconLink/IconLink'
import StickSidebar from '../../../../components/StickSidebar/StickSidebar'
import './GamesSinglePage.css'
import gameImg from '../../../../assets/img/games/big.jpg'
import WidgetItem from '../../../../components/WidgetItem/WidgetItem'

const GamesSinglePage = () => {
  return (
    <section className="games-single-page">
      <div className="container">
        <div className="game-single-preview">
          <img src={gameImg} alt="game" />
        </div>
        <div className="row">
          <div className="col-1 game-single-content">
            <div className="gs-meta">
              11.11.18 / in
              <Link to="/games"> Games</Link>
            </div>
            <h2 className="gs-title">Final Appocalipse 2.1</h2>
            <h4>Gameplay</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
              ipsum suspendisse ultrices gravida. Ipsum dolor sit amet,
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliquamet, consectetur adipiscing elit, sed
              do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Vestibulum posuere porttitor justo id pellentesque. Proin id lacus
              feugiat, posuere erat sit amet, commodo ipsum. Donec pellentesque
              vestibulum metus.
            </p>
            <h4>Conclusion</h4>
            <p>
              Nulla ut maximus mauris. Sed malesuada at sapien sed euismod.
              Vestibulum pharetra in sem id laoreet. Cras metus ex, placerat nec
              justo quis, luctus posuere ex. Vivamus volutpat nibh ac
              sollicitudin imperdiet. Donec scelerisque lorem sodales odio
              ultricies, nec rhoncus ex lobortis. Vivamus tincidunt sit amet sem
              id varius. Donec ele-mentum aliquet tortor. Curabitur justo mi,
              efficitur sed eros aliquet, dictum molestie eros. Nullam
              scelerisque convallis gravida. Morbi id lorem accumsan,
              scelerisque enim laoreet, sollicitudin neque. Vivamus volutpat
              nibh ac sollicitudin imperdiet. Donec scelerisque lorem sodales
              odio ultricies, nec rhoncus ex lobortis. Vivamus tincidunt sit
              amet sem id varius. Donec ele-mentum aliquet tortor. Curabitur
              justo mi, efficitur sed eros aliqueDonec vitae tellus sodales,
              congue augue at, biben-dum justo. Pellentesque non dolor et magna
              volutpat pharetra eget vel ligula. Maecenas facilisis vestibulum
              mattis. Sed sagittis gravida urna. Cras nec mi risus. Share:
            </p>
            <IconLink text="Share: " align="left" />
          </div>
          <div className="col-2">
            <StickSidebar>
              <div className="widget-container">
                <WidgetItem isShowTitle={true} title="Ratings">
                  <ul>
                    <li>
                      Price <span>3.5/5</span>
                    </li>
                    <li>
                      Graphics <span>4.5/5</span>
                    </li>
                    <li>
                      Levels <span>3.5/5</span>
                    </li>
                    <li>
                      Soundtrack <span>4.5/5</span>
                    </li>
                    <li>
                      Dificulty <span>4.5/5</span>
                    </li>
                  </ul>
                  <div className="rating">
                    <h5>
                      <i>Rating</i>
                      <span>4.5</span> / 5
                    </h5>
                  </div>
                </WidgetItem>
              </div>
              <div className="widget-container">
                <WidgetItem isShowTitle={true} title="Testimonials">
                  <div className="testim-text">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolo re
                      magna aliqua. Quis ipsum suspend isse ultrices.
                    </p>
                    <h6>
                      <span>James Smith,</span> Gamer
                    </h6>
                  </div>
                </WidgetItem>
              </div>
            </StickSidebar>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GamesSinglePage
