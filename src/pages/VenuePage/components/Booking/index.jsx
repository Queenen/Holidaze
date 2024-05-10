import React, { useState, useEffect } from "react";
import { useVenue } from "../../../../context/VenueContext";
import styles from "./Booking.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faUsers,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import Calendar from "../Calendar";
import Button from "../../../../components/Button";
import Loader from "../../../../components/Loader";
import { bookVenue } from "../../../../services/authService/POST/bookVenue";
import createApiKey from "../../../../services/apiAuth";
import BookingSuccess from "../BookingSuccess";

function Booking() {
  const { venue, loading, error: venueError } = useVenue();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [guestAmount, setGuestAmount] = useState("");
  const [guestError, setGuestError] = useState("");
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState("");

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    setIsLoggedIn(!!accessToken);
  }, []);

  const handleGuestChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setGuestAmount(value);
    if (venue && venue.maxGuests && value > venue.maxGuests) {
      setGuestError(
        `Maximum guests allowed for this venue is ${venue.maxGuests}.`
      );
    } else {
      setGuestError("");
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!checkInDate || !checkOutDate || !guestAmount) {
      console.error("All fields are required!");
      return;
    }

    try {
      const apiKeyResponse = await createApiKey();
      const apiKey = apiKeyResponse.data.key;

      const result = await bookVenue(
        checkInDate,
        checkOutDate,
        guestAmount,
        venue.id,
        apiKey
      );
      console.log("Booking successful:", result);
      setBookingSuccess(true);
    } catch (error) {
      console.error("Failed to book the venue:", error);
      if (error.message.includes("409")) {
        setBookingError(
          "You've already booked the venue on these specific dates!"
        );
      } else if (error.message.includes("401")) {
        setBookingError(
          "You are not authorized to book a venue. Please sign in and try again."
        );
      } else {
        setBookingError("An error occurred while booking the venue.");
      }
    } finally {
      sessionStorage.removeItem("apiKey");
    }
  };

  if (loading) return <Loader />;
  if (venueError || !venue) {
    return (
      <section
        className={`p-5 d-flex justify-content-center ${styles.bookingSection}`}
      >
        <p className="text-danger">
          <FontAwesomeIcon icon={faCircleExclamation} color="red" /> Error
          loading venue data. Please try again later.
        </p>
      </section>
    );
  }

  if (!isLoggedIn) {
    return (
      <section
        className={`p-5 d-flex justify-content-center ${styles.bookingSection}`}
      >
        <form
          className={`d-flex flex-column gap-3 w-100 ${styles.bookingForm}`}
        >
          <h1 className="mb-3">Book venue</h1>
          <p className="text-danger">
            <FontAwesomeIcon icon={faCircleExclamation} color="red" /> You need
            to be signed in to book a venue.
          </p>
        </form>
      </section>
    );
  }

  if (bookingSuccess) return <BookingSuccess />;

  return (
    <section
      className={`p-5 d-flex justify-content-center ${styles.bookingSection}`}
    >
      <form
        onSubmit={handleBookingSubmit}
        className={`d-flex flex-column gap-3 w-100 ${styles.bookingForm}`}
      >
        <h1 className="mb-3">Book venue</h1>
        {bookingError && (
          <p className="text-danger">
            <FontAwesomeIcon
              icon={faCircleExclamation}
              color="red"
              className="me-1"
            />{" "}
            {bookingError}
          </p>
        )}
        <div className="d-flex flex-column gap-2">
          <label htmlFor="guestAmount">
            <FontAwesomeIcon icon={faUsers} className="me-2" /> Guests (amount)
          </label>
          {guestError && (
            <p className="text-danger small">
              <FontAwesomeIcon icon={faCircleExclamation} color="red" />{" "}
              {guestError}
            </p>
          )}
          <input
            type="number"
            id="guestAmount"
            value={guestAmount}
            onChange={handleGuestChange}
            min="1"
            className="rounded-5 px-3"
            required
          />
        </div>
        <label>
          <FontAwesomeIcon icon={faCalendar} className="me-2" />{" "}
          Check-in/Check-out
        </label>
        <div className="d-flex justify-content-between gap-3">
          <Calendar selectedDate={checkInDate} onChange={setCheckInDate} />
          <Calendar selectedDate={checkOutDate} onChange={setCheckOutDate} />
        </div>
        <div className={styles.bookBtn}>
          <Button type="submit">Book venue</Button>
        </div>
      </form>
    </section>
  );
}

export default Booking;
