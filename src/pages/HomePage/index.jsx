import styles from "./HomePage.module.css";
import Button from "../../components/Button";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      <div className={`position-relative ${styles.hero}`}>
        <div
          className={`w-100 text-white d-flex flex-column flex-md-row col-10 col-sm-7 col-md-auto justify-content-end justify-content-md-around p-4 p-sm-5 gap-3 position-absolute ${styles.heroContent}`}
        >
          <div className={`d-flex flex-column gap-3 col-md-6`}>
            <h1>
              From Cozy Corners <br />
              to Urban Escapes
            </h1>
            <h2 className="fs-5 fst-italic">Find It all on Holidaze</h2>
          </div>
          <Link
            to="/venues"
            className="col-md-5 d-flex align-self-md-center justify-content-md-end"
          >
            <Button>View all venues</Button>
          </Link>
        </div>
      </div>
      <div
        id="topRatedVenues"
        className={`p-4 p-md-5 d-flex justify-content-center align-items-center ${styles.topRatedVenues}`}
      >
        <h1 className={`display-5 fw-bold text-uppercase`}>Top rated venues</h1>
      </div>
    </>
  );
}

export default HomePage;
