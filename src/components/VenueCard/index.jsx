import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faStarHalfStroke,
  faUtensils,
  faCarSide,
  faPaw,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Button from "../Button";
import TextTruncate from "../TextTruncate";
import styles from "./VenueCard.module.css";

const VenueCard = ({ venue, showEditButton = false }) => {
  const fallbackImage =
    "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?crop=entropy&fit=crop&h=900&q=80&w=1600";
  const handleImageError = (e) => {
    e.target.src = fallbackImage;
  };

  return (
    <div className={`position-relative ${styles.venueCard}`}>
      <Link to={`/venue?id=${venue.id}`}>
        {venue.media.length > 0 ? (
          <div className={styles.backgroundImageContainer}>
            <img
              className="d-block w-100"
              src={venue.media[0].url}
              alt={venue.media[0].alt || venue.name}
              onError={handleImageError}
            />
            <div className={styles.overlay}></div>
          </div>
        ) : (
          <div className={styles.backgroundImageContainer}>
            <img
              className="d-block w-100"
              src={fallbackImage}
              alt="missing media"
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
        <div
          className={`position-absolute bottom-0 p-4 w-100 ${styles.caption}`}
        >
          {showEditButton && (
            <div className={styles.editBtn}>
              <Button>Edit Venue</Button>
            </div>
          )}
          <h2 className="d-flex justify-content-center fs-">
            <TextTruncate text={venue.name} maxLength={18} />
          </h2>
          <p className="d-flex justify-content-center">
            <TextTruncate text={venue.description} maxLength={30} />
          </p>
          <div
            className={`facilities d-flex gap-4 justify-content-center my-3 ${styles.facilitiesContainer}`}
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
              <FontAwesomeIcon
                icon={faPaw}
                color="white"
                className={styles.icon}
              />
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default VenueCard;
