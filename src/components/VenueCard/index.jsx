import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faStarHalfStroke,
  faUtensils,
  faCarSide,
  faPaw,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./VenueCard.module.css";
import { Link } from "react-router-dom";
import Button from "../Button";
import TextTruncate from "../TextTruncate";
import { getValidImageUrl } from "../../utils/imageValidation";
const fallbackImage =
  "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?crop=entropy&fit=crop&h=900&q=80&w=1600";

const VenueCard = ({ venue, showEditButton = false }) => {
  const [imageUrl, setImageUrl] = useState(fallbackImage);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkImage = async () => {
      const validImageUrl = await getValidImageUrl(
        venue.media.length > 0 ? venue.media[0].url : ""
      );
      setImageUrl(validImageUrl);
      setIsLoading(false);
    };

    checkImage();
  }, [venue.media]);

  return (
    <div className={`position-relative ${styles.venueCard}`}>
      <Link to={`/venue?id=${venue.id}`}>
        <div className={styles.backgroundImageContainer}>
          {isLoading ? (
            <img
              className="d-block w-100"
              src={fallbackImage}
              alt="Loading..."
            />
          ) : (
            <img
              className="d-block w-100"
              src={imageUrl}
              alt={
                venue.media.length > 0
                  ? venue.media[0].alt || venue.name
                  : "missing media"
              }
            />
          )}
          <div className={styles.overlay}></div>
        </div>
        <div className="d-flex justify-content-between position-absolute top-0 p-4 w-100">
          <div className="d-flex gap-3 align-items-center">
            <FontAwesomeIcon
              icon={faStarHalfStroke}
              color="white"
              className={styles.icon}
            />
            <p className="fw-semibold text-white focusFont">
              {venue.rating ? `${venue.rating}` : "N/A"}
            </p>
          </div>
          <div className="d-flex gap-3 align-items-center">
            <FontAwesomeIcon
              icon={faUsers}
              color="white"
              className={styles.icon}
            />
            <p className="fw-semibold text-white focusFont">
              {venue.maxGuests ? `${venue.maxGuests}` : "N/A"}
            </p>
          </div>
        </div>
        <div
          className={`position-absolute bottom-0 p-4 px-lg-5 d-flex flex-column gap-3 w-100 text-white`}
        >
          {showEditButton && (
            <div className={styles.editBtn}>
              <Button>Edit Venue</Button>
            </div>
          )}
          <h2 className="d-flex justify-content-center fs-3 focusFont">
            {venue.name ? (
              <TextTruncate text={venue.name} className="lh-base" />
            ) : (
              "Undefined"
            )}
          </h2>
          <p className="d-flex justify-content-center defaultFont">
            {venue.description ? (
              <TextTruncate text={venue.description} />
            ) : (
              "Undefined"
            )}
          </p>
          <div
            className={`facilities d-flex gap-4 justify-content-center mt-4 ${styles.facilitiesContainer}`}
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
