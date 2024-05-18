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
import Loader from "../../../../components/Loader";
import { useVenue } from "../../../../context/VenueContext";

const VenueCarousel = ({ showEditButton = false }) => {
  const { venue, loading, error } = useVenue();

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorMsg}>{error}</div>
      </div>
    );
  }

  if (!venue) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorMsg}>Venue data is not available.</div>
      </div>
    );
  }

  const hasMultipleMedia = venue.media.length > 1;

  return (
    <section
      className={styles.venueCarouselSection}
      style={{ position: "relative" }}
    >
      <div
        className={`${styles.overlayIcons} d-flex justify-content-between position-absolute top-0 p-4 w-100`}
      >
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
      {showEditButton && (
        <div
          className={styles.editBtn}
          style={{
            position: "absolute",
            zIndex: 5,
            right: "20px",
            top: "20px",
          }}
        >
          <Button>Edit Venue</Button>
        </div>
      )}
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
          </Carousel.Item>
        ))}
      </Carousel>
      <div
        className={`${
          styles.overlayIcons
        } d-flex gap-4 p-4 justify-content-center position-absolute bottom-0 w-100 ${
          hasMultipleMedia ? styles.indicatorMargin : ""
        }`}
      >
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
          <FontAwesomeIcon icon={faPaw} color="white" className={styles.icon} />
        )}
      </div>
    </section>
  );
};

export { VenueCarousel };
