import React, { useState, useEffect } from "react";
import styles from "./MyBookings.module.css";
import VenueCarousel from "../../../../components/Carousel";
import EditBooking from "../EditBooking";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

const MyBookings = ({ user, showEditButton = true }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    setIsVisible(user.bookings.length > 0);
  }, [user.bookings.length]);

  const fetchUserBookings = async () => {
    return user.bookings.map((booking) => ({
      id: booking.id,
      ...booking.venue,
      bookingId: booking.id,
      dateFrom: booking.dateFrom,
      dateTo: booking.dateTo,
    }));
  };

  const toggleBookings = () => {
    setIsVisible(!isVisible);
  };

  const handleEditBooking = (e, booking) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBooking(null);
  };

  return (
    <section className={styles.myBookings}>
      <button className={styles.showBookings} onClick={toggleBookings}>
        {isVisible ? "Hide my bookings" : "Show my bookings"}
      </button>
      {isVisible && (
        <>
          {user.bookings.length > 0 ? (
            <VenueCarousel
              fetchFunction={fetchUserBookings}
              showEditButton={showEditButton}
              height="25rem"
              onEditClick={handleEditBooking}
              editButtonText="Edit Booking"
              user={user}
              bookingCarousel={true}
            />
          ) : (
            <div className={styles.emptyContent}>
              <p className="text-danger">
                <FontAwesomeIcon
                  icon={faCircleExclamation}
                  color="red"
                  className="me-1"
                />
                You haven't booked any venues yet.
              </p>
            </div>
          )}
        </>
      )}
      {showModal && (
        <EditBooking closeModal={closeModal} bookingData={selectedBooking} />
      )}
    </section>
  );
};

export default MyBookings;
