import React, { useState } from "react";
import { useUserStatus } from "../../../../context/UserStatus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../../components/Button";
import Loader from "../../../../components/Loader";
import { bookVenue } from "../../../../services/authService/POST/bookVenue";
import BookingSuccess from "../BookingSuccess";
import { FormGroup } from "../../../../components/Form";
import { Input } from "../../../../components/Input";
import styles from "./Booking.module.css";

function Booking({ venue, loading, error: venueError }) {
  const { isSignedIn } = useUserStatus();
  const [formData, setFormData] = useState({
    checkInDate: "",
    checkOutDate: "",
    guests: "",
  });
  const [errors, setErrors] = useState({});
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState("");

  const venueDataId = venue.data.id;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowString = tomorrow.toISOString().split("T")[0];

      if (name === "guests") {
        if (parseInt(value, 10) > venue.data.maxGuests) {
          newErrors.guests = `Maximum guests allowed for this venue is ${venue.data.maxGuests}.`;
        } else {
          delete newErrors.guests;
        }
      }

      if (name === "checkInDate") {
        if (value < tomorrowString) {
          newErrors.checkInDate = "Start date cannot be earlier than tomorrow.";
        } else if (formData.checkOutDate && value > formData.checkOutDate) {
          newErrors.checkInDate = "Start date must be before the end date.";
        } else {
          delete newErrors.checkInDate;
        }

        if (formData.checkOutDate && value <= formData.checkOutDate) {
          delete newErrors.checkOutDate;
        }
      }

      if (name === "checkOutDate") {
        if (value < tomorrowString) {
          newErrors.checkOutDate = "End date cannot be earlier than tomorrow.";
        } else if (value < formData.checkInDate) {
          newErrors.checkOutDate = "End date must be after the start date.";
        } else {
          delete newErrors.checkOutDate;
        }

        if (formData.checkInDate && value >= formData.checkInDate) {
          delete newErrors.checkInDate;
        }
      }

      return newErrors;
    });
  };

  const validateForm = () => {
    const newErrors = {};
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowString = tomorrow.toISOString().split("T")[0];

    if (!formData.checkInDate.trim())
      newErrors.checkInDate = "Start date is required";
    if (formData.checkInDate < tomorrowString)
      newErrors.checkInDate = "Start date cannot be earlier than tomorrow.";
    if (!formData.checkOutDate.trim())
      newErrors.checkOutDate = "End date is required";
    if (formData.checkOutDate < tomorrowString)
      newErrors.checkOutDate = "End date cannot be earlier than tomorrow.";
    if (formData.checkInDate >= formData.checkOutDate)
      newErrors.checkInDate = "Start date must be before the end date.";
    if (!formData.guests || isNaN(formData.guests) || formData.guests <= 0)
      newErrors.guests = "Guests must be a positive number";
    if (parseInt(formData.guests, 10) > venue.data.maxGuests)
      newErrors.guests = `This venue allows a max of ${venue.data.maxGuests} guests.`;

    if (Object.keys(newErrors).length > 0) {
      newErrors.submitBtn = "Please fix the error prompts before submitting";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const bookingData = {
      dateFrom: formData.checkInDate,
      dateTo: formData.checkOutDate,
      guests: parseInt(formData.guests, 10),
      venueId: venueDataId,
    };

    try {
      await bookVenue(bookingData);
      setBookingSuccess(true);
      setFormData({
        checkInDate: "",
        checkOutDate: "",
        guests: "",
      });
    } catch (error) {
      console.error("Failed to book the venue:", error);
      if (error.message.includes("409")) {
        setBookingError("There's already a booking set for these dates!");
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
        className={`p-5 d-flex justify-content-center col-md-6 col-lg-5 col-xl-8 order-0 ${styles.bookingSection}`}
      >
        <p className="text-danger">
          <FontAwesomeIcon icon={faCircleExclamation} color="red" /> Error
          loading venue data. Please try again later.
        </p>
      </section>
    );
  }

  if (!isSignedIn) {
    return (
      <section
        className={`p-5 d-flex justify-content-center col-md-6 col-lg-4 order-0 ${styles.bookingSection}`}
      >
        <form
          className={`d-flex flex-column gap-3 w-100 justify-content-center ${styles.bookingForm}`}
        >
          <h1 className="seasons fw-semibold fs-2 mb-5">Book venue</h1>
          <p className="text-danger">
            <FontAwesomeIcon
              icon={faCircleExclamation}
              color="red"
              className="me-1"
            />{" "}
            Please sign in before you book a venue
          </p>
        </form>
      </section>
    );
  }

  if (bookingSuccess) return <BookingSuccess />;

  return (
    <div
      className={` ${styles.bookingContainer} container-fluid p-5 position-relative d-flex flex-column align-items-center justify-content-center w-100`}
    >
      <h1 className="seasons fw-semibold fs-2 mb-5">Book Venue</h1>
      <FormGroup>
        <Input
          type="date"
          id="checkInDate"
          name="checkInDate"
          value={formData.checkInDate}
          onChange={handleChange}
          placeholder="Enter Start Date"
          isLabel={true}
          label="Start Date"
          required={true}
          errorMessage={errors.checkInDate}
        />
        <Input
          type="date"
          id="checkOutDate"
          name="checkOutDate"
          value={formData.checkOutDate}
          onChange={handleChange}
          placeholder="Enter End Date"
          isLabel={true}
          label="End Date"
          required={true}
          errorMessage={errors.checkOutDate}
        />
        <Input
          type="number"
          id="guests"
          name="guests"
          value={formData.guests}
          onChange={handleChange}
          placeholder="Amount of guests"
          isLabel={true}
          label="Guests"
          required={true}
          errorMessage={errors.guests}
        />
      </FormGroup>
      {errors.apiError && (
        <div className="text-danger small my-2">{errors.apiError}</div>
      )}
      {bookingError && (
        <div className="text-danger small my-2">{bookingError}</div>
      )}
      <div className={styles.bookBtn}>
        <Button
          type="submit"
          name="submitBtn"
          errorMessage={errors.submitBtn}
          onClick={handleSubmit}
        >
          Book Venue
        </Button>
      </div>
    </div>
  );
}

export default Booking;
