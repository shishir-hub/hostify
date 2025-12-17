import Filterbar from "../Filterbar/Filterbar";
import "./Hero.scss";

const Hero = () => {
  return (
    <div className="home-page-hero">
      <div className="container-wrapper">
        <article>
          <h1>
            Find a <span>host</span> for every journey
          </h1>
          <h4>
            Discover the best local rental properties that fits your every
            travel needs
          </h4>
        </article>

        <Filterbar />
      </div>
    </div>
  );
};

export default Hero;
