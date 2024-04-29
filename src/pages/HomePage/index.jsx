import styles from "./HomePage.module.css";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { fetchData } from "../../services/authService";

function HomePage() {
  const [venues, setVenues] = useState(null);

  useEffect(() => {
    fetchData("/holidaze/venues")
      .then((data) => {
        if (data && data.data) {
          setVenues(data.data);
        }
      })
      .catch((error) => console.error("Fetching venues failed:", error));
  }, []);
  return (
    <>
      <section className={`position-relative ${styles.hero}`}>
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
      </section>
      <section
        id="topRatedVenues"
        className={`p-4 p-md-5 d-flex justify-content-center align-items-center ${styles.topRatedVenues}`}
      >
        <div className={`d-flex flex-column`}>
          <h1 className={`display-5 fw-bold text-uppercase col-12`}>
            Top rated venues
          </h1>
          {venues ? (
            <ul className="d-flex flex-column">
              {venues.map((venue) => (
                <li key={venue.id}>
                  <h2>{venue.name}</h2>
                  <p>{venue.description}</p>
                  {venue.media.map((media, index) => (
                    <img
                      key={index}
                      src={media.url}
                      alt={media.alt}
                      style={{ width: "100px", height: "auto" }}
                    />
                  ))}
                </li>
              ))}
            </ul>
          ) : (
            <p>Loading venues...</p>
          )}
        </div>
      </section>
    </>
  );
}

export default HomePage;
