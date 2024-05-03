import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { fetchTopRatedVenues } from "../../../../../services/authService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faStarHalfStroke,
  faUtensils,
  faCarSide,
  faPaw,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../../../../../components/Button";
import TextTruncate from "../../../../../components/TextTruncate";
import styles from "./TopRated.module.css";
import { Link } from "react-router-dom";

const TopRated = ({ showEditButton = true }) => {
  const [topRatedVenues, setTopRatedVenues] = useState([]);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const venues = await fetchTopRatedVenues();
        setTopRatedVenues(venues);
      } catch (error) {
        console.error("Error fetching top-rated venues:", error);
      }
    };

    fetchVenues();
  }, []);

  return (
    <Carousel>
      {topRatedVenues.map((venue) => {
        const formattedName = venue.name.replace(/\s+/g, "-").toLowerCase();

        return (
          <Carousel.Item
            key={venue.id}
            className={`position-relative ${styles.carouselItem}`}
          >
            <Link to={`/venue?name=${formattedName}`}>
              {venue.media.length > 0 && (
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
        );
      })}
    </Carousel>
  );
};

export { TopRated };
