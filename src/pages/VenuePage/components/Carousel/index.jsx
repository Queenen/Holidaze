// VenueCarousel.jsx
import React from "react";
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
import styles from "./Carousel.module.css";
import { useSearchParams } from "react-router-dom";
import { fetchVenueById } from "../../../../services/authService";
import useApi from "../../../../services/useApi";
import Loader from "../../../../components/Loader";

const VenueCarousel = ({ showEditButton = false }) => {
  const [searchParams] = useSearchParams();
  const venueId = searchParams.get("id");
  const {
    data: venue,
    loading,
    errorMessage,
  } = useApi(fetchVenueById, [venueId]);

  if (loading) {
    return <Loader />;
  }

  if (errorMessage) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorMsg}>{errorMessage}</div>
      </div>
    );
  }

  const hasMultipleMedia = venue.media.length > 1;

  const captionStyle = {
    marginBottom: venue.media.length === 1 ? "-2rem" : "0",
  };

  return (
    <section>
      <Carousel controls={hasMultipleMedia} indicators={hasMultipleMedia}>
        {venue.media.map((mediaItem, index) => (
          <Carousel.Item
            key={index}
            className={`position-relative ${styles.carouselItem}`}
          >
            <div className={styles.backgroundImageContainer}>
              <img
                className="d-block w-100"
                src={mediaItem.url}
                alt={mediaItem.alt || venue.name}
              />
              <div className={styles.overlay}></div>
            </div>
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
            <Carousel.Caption style={captionStyle}>
              {showEditButton && (
                <div className={styles.editBtn}>
                  <Button>Edit Venue</Button>
                </div>
              )}
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
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  );
};

export { VenueCarousel };
