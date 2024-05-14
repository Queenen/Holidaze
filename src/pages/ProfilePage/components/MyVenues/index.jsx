import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faStarHalfStroke,
  faUtensils,
  faCarSide,
  faPaw,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../../../../components/Button";
import TextTruncate from "../../../../components/TextTruncate";
import styles from "./MyVenues.module.css";
import { Link } from "react-router-dom";

const MyVenues = ({ user, showEditButton = true }) => {
  const venues = user.venues;
  const [isVisible, setIsVisible] = useState(false);

  function toggleVenues() {
    setIsVisible(!isVisible);
  }

  return (
    <section className={styles.myVenues}>
      <button className={styles.showVenues} onClick={toggleVenues}>
        {isVisible ? "Hide my venues" : "Show my venues"}
      </button>
      <Carousel
        className={`${styles.myVenuesContent} ${
          isVisible ? "" : styles.hidden
        }`}
      >
        {venues.length === 0 && (
          <div className={styles.emptyContent}>
            You haven't added any venues yet.
          </div>
        )}
        {venues &&
          venues.map((venue) => (
            <Carousel.Item
              key={venue.id}
              className={`position-relative ${styles.carouselItem}`}
            >
              <Link to={`/venue?id=${venue.id}`}>
                {venue.media && venue.media.length > 0 && (
                  <div className={styles.backgroundImageContainer}>
                    <img
                      className="d-block w-100"
                      src={venue.media[0].url}
                      alt={venue.media[0].alt || venue.name}
                    />
                    <div className={styles.overlay}></div>
                  </div>
                )}
                <div className="d-flex justify-content-between position-absolute top-0 p-4 w-100">
                  <div className="d-flex gap-3 align-items-center">
                    <FontAwesomeIcon
                      icon={faStarHalfStroke}
                      color="white"
                      className={styles.icon}
                    />
                    <p className="fw-bold text-white">{venue.rating}</p>
                  </div>
                  <div className="d-flex gap-3 align-items-center">
                    <FontAwesomeIcon
                      icon={faUsers}
                      color="white"
                      className={styles.icon}
                    />
                    <p className="fw-bold text-white">{venue.maxGuests}</p>
                  </div>
                </div>
                <Carousel.Caption>
                  {showEditButton && (
                    <div className={styles.editBtn}>
                      <Button>Edit Venue</Button>
                    </div>
                  )}
                  <h2 className="d-flex justify-content-center fs-">
                    <TextTruncate text={venue.name} maxLength={30} />
                  </h2>
                  <p className="d-flex justify-content-center">
                    <TextTruncate text={venue.description} maxLength={30} />
                  </p>
                  <div className="facilities d-flex gap-4 justify-content-center my-3">
                    {venue.meta.wifi && (
                      <FontAwesomeIcon
                        icon={faWifi}
                        color="white"
                        className={styles.icon}
                      />
                    )}
                    {venue.meta.parking && (
                      <FontAwesomeIcon
                        icon={faCarSide}
                        color="white"
                        className={styles.icon}
                      />
                    )}
                    {venue.meta.breakfast && (
                      <FontAwesomeIcon
                        icon={faUtensils}
                        color="white"
                        className={styles.icon}
                      />
                    )}
                    {venue.meta.pets && (
                      <FontAwesomeIcon
                        icon={faPaw}
                        color="white"
                        className={styles.icon}
                      />
                    )}
                  </div>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          ))}
      </Carousel>
    </section>
  );
};

export default MyVenues;
