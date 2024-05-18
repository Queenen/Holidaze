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
import TextTruncate from "../../../../components/TextTruncate";
import styles from "./MyBookings.module.css";
import { Link } from "react-router-dom";
import EditBooking from "../EditBooking";

const MyBookings = ({ user, showEditButton = true }) => {
  const bookings = user.bookings;
  const [isVisible, setIsVisible] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  useEffect(() => {
    if (bookings.length === 0) {
      setIsVisible(false);
    }
  }, [bookings.length]);

  function toggleBookings() {
    setIsVisible(!isVisible);
  }

  function handleEditBooking(e, id) {
    e.preventDefault();
    e.stopPropagation();
    console.log(id);
    setSelectedBookingId(id);
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setSelectedBookingId(null); // Reset the selected booking ID when the modal is closed
  }

  return (
    <section className={styles.myBookings}>
      <button className={styles.showBookings} onClick={toggleBookings}>
        {isVisible ? "Hide my bookings" : "Show my bookings"}
      </button>
      <Carousel
        className={`${styles.myBookingsContent} ${
          isVisible ? "" : styles.hidden
        }`}
      >
        {bookings.length === 0 && (
          <div className={styles.emptyContent}>
            You haven't booked any venues yet.
          </div>
        )}
        {bookings &&
          bookings.map((booking) => (
            <Carousel.Item
              key={booking.id}
              className={`position-relative ${styles.carouselItem}`}
            >
              <Link to={`/venue?id=${booking.venue.id}`}>
                {booking.venue.media && booking.venue.media.length > 0 && (
                  <div className={styles.backgroundImageContainer}>
                    <img
                      className="d-block w-100"
                      src={booking.venue.media[0].url}
                      alt={booking.venue.media[0].alt || booking.venue.name}
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
                    <p className="fw-bold text-white">{booking.venue.rating}</p>
                  </div>
                  <div className="d-flex gap-3 align-items-center">
                    <FontAwesomeIcon
                      icon={faUsers}
                      color="white"
                      className={styles.icon}
                    />
                    <p className="fw-bold text-white">
                      {booking.venue.maxGuests}
                    </p>
                  </div>
                </div>
                <Carousel.Caption>
                  {showEditButton && (
                    <div
                      className={styles.editBtn}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button onClick={(e) => handleEditBooking(e, booking.id)}>
                        Edit Booking
                      </Button>
                    </div>
                  )}
                  <h2 className="d-flex justify-content-center fs-">
                    <TextTruncate text={booking.venue.name} maxLength={30} />
                  </h2>
                  <p className="d-flex justify-content-center">
                    <TextTruncate
                      text={booking.venue.description}
                      maxLength={30}
                    />
                  </p>
                  <div className="facilities d-flex gap-4 justify-content-center my-3">
                    {booking.venue.meta.wifi && (
                      <FontAwesomeIcon
                        icon={faWifi}
                        color="white"
                        className={styles.icon}
                      />
                    )}
                    {booking.venue.meta.parking && (
                      <FontAwesomeIcon
                        icon={faCarSide}
                        color="white"
                        className={styles.icon}
                      />
                    )}
                    {booking.venue.meta.breakfast && (
                      <FontAwesomeIcon
                        icon={faUtensils}
                        color="white"
                        className={styles.icon}
                      />
                    )}
                    {booking.venue.meta.pets && (
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
      {showModal && (
        <EditBooking closeModal={closeModal} bookingId={selectedBookingId} />
      )}
    </section>
  );
};

export default MyBookings;
