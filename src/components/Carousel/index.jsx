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
import { Link } from "react-router-dom";
import Button from "../Button";
import TextTruncate from "../TextTruncate";
import styles from "./VenueCarousel.module.css";
import { v4 as uuidv4 } from "uuid";

const VenueCarousel = ({
  fetchFunction,
  showEditButton = false,
  onEditClick,
  editButtonText = "Edit Venue",
}) => {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const fetchedVenues = await fetchFunction();

        const venuesWithIds = fetchedVenues.map((venue) => ({
          ...venue,
          uuid: uuidv4(),
          media: venue.media || [], // Ensure media is an array
          meta: venue.meta || {}, // Ensure meta is an object
        }));
        setVenues(venuesWithIds);
      } catch (error) {
        console.error("Error fetching venues:", error);
      }
    };

    fetchVenues();
  }, [fetchFunction]);

  return (
    <Carousel className={styles.carousel}>
      {venues.map((venue) => (
        <Carousel.Item
          key={venue.uuid}
          className={`position-relative ${styles.carouselItem}`}
        >
          <Link
            to={`/venue?id=${venue.id}`}
            onClick={(e) => e.stopPropagation()}
          >
            {venue.media.length > 0 && (
              <div className={styles.backgroundImageContainer}>
                <img
                  className="d-block w-100"
                  src={venue.media[0]?.url}
                  alt={venue.media[0]?.alt || venue.name}
                  style={{ height: "100%", objectFit: "cover" }}
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
                <div
                  className={styles.editBtn}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      onEditClick(e, venue);
                    }}
                    className="_button_dzije_1 _bigBtn_dzije_31"
                  >
                    {editButtonText}
                  </Button>
                </div>
              )}
              <h2 className="d-flex justify-content-center fs-">
                <TextTruncate text={venue.name} maxLength={17} />
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
  );
};

export default VenueCarousel;