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
import { getValidImageUrl } from "../../utils/imageValidation";
import styles from "./VenueCarousel.module.css";
import { v4 as uuidv4 } from "uuid";
import LoadingError from "../../utils/LoadingError";

const fallbackImage =
  "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?crop=entropy&fit=crop&h=900&q=80&w=1600";

const VenueCarousel = ({
  fetchFunction,
  showEditButton = false,
  onEditClick,
  editButtonText = "Edit Venue",
  user,
  bookingCarousel = false,
}) => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVenues = async () => {
      setLoading(true);
      try {
        const fetchedVenues = await fetchFunction();
        const updatedVenues = await Promise.all(
          fetchedVenues.map(async (venue) => {
            const validImageUrl = await getValidImageUrl(
              venue.media.length > 0 ? venue.media[0].url : ""
            );
            return {
              ...venue,
              media: [{ url: validImageUrl }],
            };
          })
        );
        setVenues(updatedVenues);
      } catch (error) {
        setError("Error fetching venues: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, [fetchFunction]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <LoadingError loading={loading} error={error} height="20rem">
      <Carousel className={styles.carousel}>
        {venues.map((venue) => (
          <Carousel.Item
            key={uuidv4()}
            className={`position-relative ${styles.carouselItem}`}
          >
            <Link
              to={`/venue?id=${venue.id}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.backgroundImageContainer}>
                <img
                  className="d-block w-100"
                  src={venue.media[0].url || fallbackImage}
                  alt={venue.media[0].alt || venue.name || "venue media"}
                  style={{ height: "100%", objectFit: "cover" }}
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
                  <p className="fw-bold text-white">
                    {venue.maxGuests ? `${venue.maxGuests}` : "N/A"}
                  </p>
                </div>
              </div>
              <Carousel.Caption className="p-3 px-lg-5 d-flex flex-column gap-3">
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
                    >
                      {editButtonText}
                    </Button>
                  </div>
                )}
                <h2 className="d-flex justify-content-center fs-3 focusFont">
                  {venue.name ? (
                    <TextTruncate text={venue.name} className="lh-base" />
                  ) : (
                    "Undefined"
                  )}
                </h2>

                {bookingCarousel ? (
                  <div className="d-flex justify-content-center">
                    <p>
                      <TextTruncate
                        text={`${formatDate(venue.dateFrom)} - ${formatDate(
                          venue.dateTo
                        )}`}
                      />
                    </p>
                  </div>
                ) : (
                  <p className="d-flex justify-content-center defaultFont">
                    <TextTruncate text={venue.description} />
                  </p>
                )}

                <div className="facilities d-flex gap-4 justify-content-center mb-3 mt-4">
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
    </LoadingError>
  );
};

export default VenueCarousel;
