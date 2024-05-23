import React, { useState, useEffect } from "react";
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
import { getValidImageUrl } from "../../../../utils/imageValidation";
import styles from "./Carousel.module.css";

const fallbackImage =
  "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?crop=entropy&fit=crop&h=900&q=80&w=1600";

const VenueCarousel = ({ venue, showEditButton = false }) => {
  const [mediaUrls, setMediaUrls] = useState([]);

  useEffect(() => {
    const validateMediaUrls = async () => {
      const validatedMedia = await Promise.all(
        venue.media.map(async (mediaItem) => {
          const validImageUrl = await getValidImageUrl(mediaItem.url);
          return {
            ...mediaItem,
            url: validImageUrl,
          };
        })
      );
      setMediaUrls(validatedMedia);
    };

    if (venue && venue.media) {
      validateMediaUrls();
    }
  }, [venue]);

  if (!venue) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorMsg}>Venue data is not available.</div>
      </div>
    );
  }

  const hasMultipleMedia = mediaUrls.length > 1;

  return (
    <section className={styles.venueCarouselSection}>
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
        <div className={styles.editBtn}>
          <Button>Edit Venue</Button>
        </div>
      )}
      <Carousel controls={hasMultipleMedia} indicators={hasMultipleMedia}>
        {mediaUrls.map((mediaItem, index) => (
          <Carousel.Item
            key={index}
            className={`position-relative ${styles.carouselItem}`}
          >
            <div className={styles.backgroundImageContainer}>
              <img
                className="d-block w-100"
                src={mediaItem.url || fallbackImage}
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
        {venue.meta?.wifi && (
          <FontAwesomeIcon
            icon={faWifi}
            color="white"
            className={styles.icon}
          />
        )}
        {venue.meta?.parking && (
          <FontAwesomeIcon
            icon={faCarSide}
            color="white"
            className={styles.icon}
          />
        )}
        {venue.meta?.breakfast && (
          <FontAwesomeIcon
            icon={faUtensils}
            color="white"
            className={styles.icon}
          />
        )}
        {venue.meta?.pets && (
          <FontAwesomeIcon icon={faPaw} color="white" className={styles.icon} />
        )}
      </div>
    </section>
  );
};

export default VenueCarousel;
