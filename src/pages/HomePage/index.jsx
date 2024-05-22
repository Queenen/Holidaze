import Button from "../../components/Button";
import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import VenueCarousel from "../../components/Carousel";
import {
  fetchTopRatedVenues,
  fetchRandomVenues,
} from "../../services/authService/GET/fetchSpecificVenues";

function HomePage() {
  useDocumentTitle("Holidaze | Home");
  return (
    <>
      <section className={`position-relative ${styles.hero}`}>
        <div
          className={`w-100 text-white d-flex flex-column flex-md-row col-10 col-sm-7 col-md-auto justify-content-end justify-content-md-around p-4 p-sm-5 gap-3 position-absolute ${styles.heroContent}`}
        >
          <div className={`d-flex flex-column gap-3 col-md-6`}>
            <h1 className="focusFont">
              From Cozy Corners <br />
              to Urban Escapes
            </h1>
            <h2 className="fs-5 fst-italic defaultFont">
              Find It all on Holidaze
            </h2>
          </div>
          <Link
            to="/venues"
            className="col-md-5 d-flex align-self-md-center justify-content-md-end"
          >
            <Button>View all venues</Button>
          </Link>
        </div>
      </section>
      <div
        className={`container-fluid p-0 d-md-flex justify-content-center ${styles.carouselContainer}`}
      >
        <section
          id="topRatedVenues"
          className={`col-md-6 ${styles.topRatedVenues}`}
        >
          <h1 className="text-center fw-bold text-uppercase p-4 p-md-5 seasons">
            Top Rated
          </h1>
          <VenueCarousel fetchFunction={fetchTopRatedVenues} />
        </section>
        <section
          id="randomVenues"
          className={`col-md-6 ${styles.randomVenues}`}
        >
          <h1 className="text-center fw-bold text-uppercase p-4 p-md-5 seasons">
            Random Picks
          </h1>
          <VenueCarousel fetchFunction={fetchRandomVenues} />
        </section>
      </div>
    </>
  );
}

export default HomePage;
