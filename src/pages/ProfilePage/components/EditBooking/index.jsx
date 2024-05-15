import React, { useState } from "react";
import styles from "./EditBooking.module.css";
import Button from "../../../../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { editBooking } from "../../../../services/authService/PUT/editBooking"; // Import the editBooking function

function EditBooking({ closeModal, bookingId }) {
  // Accept bookingId as a prop
  const [formState, setFormState] = useState({
    dateFrom: "",
    dateTo: "",
    guestAmount: "",
  });

  const [errors, setErrors] = useState({
    dateFrom: "",
    dateTo: "",
    guestAmount: "",
  });

  const [isGuestAmountFocused, setIsGuestAmountFocused] = useState(false);

  function handleFocus() {
    setIsGuestAmountFocused(true);
  }

  function handleBlur() {
    setIsGuestAmountFocused(false);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    let newErrors = { ...errors };

    if (name === "guestAmount") {
      if (value > 5) {
        newErrors.guestAmount = "This venue allows a maximum of 5 guests.";
      } else if (value === "0" && isGuestAmountFocused) {
        newErrors.guestAmount = "Please enter a valid number.";
      } else {
        newErrors.guestAmount = "";
      }
    }

    if (name === "dateFrom" || name === "dateTo") {
      const { dateFrom, dateTo } = {
        ...formState,
        [name]: value,
      };

      if (!dateFrom || !dateTo) {
        newErrors.dateFrom = newErrors.dateTo =
          "Please set a date for both inputs.";
      } else if (new Date(dateTo) <= new Date(dateFrom)) {
        newErrors.dateFrom = newErrors.dateTo =
          "Please ensure that the check-out date is after the check-in date.";
      } else {
        newErrors.dateFrom = newErrors.dateTo = "";
      }
    }

    setErrors(newErrors);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (Object.values(errors).some((error) => error !== "")) {
      return;
    }

    const { dateFrom, dateTo, guestAmount } = formState;

    try {
      const bookingData = {
        dateFrom: dateFrom || null,
        dateTo: dateTo || null,
        guests: guestAmount ? parseInt(guestAmount, 10) : null,
      };

      const success = await editBooking(bookingId, bookingData);

      if (success) {
        alert("Booking updated successfully.");
        closeModal();
      } else {
        alert("Failed to update booking.");
      }
    } catch (error) {
      console.error("Error updating booking:", error);
      alert("An error occurred while updating the booking.");
    }
  }

  return (
    <div className={`${styles.modalBackdrop}`}>
      <form
        onSubmit={handleSubmit}
        className={`gap-5 p-5 position-relative ${styles.form}`}
      >
        <FontAwesomeIcon
          icon={faCircleXmark}
          size="2x"
          className={`${styles.closeModal}`}
          onClick={closeModal}
        />
        <h1 className={`mt-4`}>Edit booking</h1>
        <div className="d-flex flex-column gap-3">
          <h2 className="fs-5">Booking dates</h2>
          <div className="d-flex flex-column gap-1">
            {errors.dateFrom && (
              <div className="text-danger small">{errors.dateFrom}</div>
            )}
            <label htmlFor="dateFrom">Check-in date</label>
            <input
              type="date"
              id="dateFrom"
              name="dateFrom"
              value={formState.dateFrom}
              onChange={handleChange}
            />
          </div>
          <div className="d-flex flex-column gap-1">
            {errors.dateTo && (
              <div className="text-danger small">{errors.dateTo}</div>
            )}
            <label htmlFor="dateTo">Check-out date</label>
            <input
              type="date"
              id="dateTo"
              name="dateTo"
              value={formState.dateTo}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="d-flex flex-column gap-3">
          <h2 className="fs-5">Guests (amount)</h2>
          <div className="d-flex flex-column gap-1">
            <label htmlFor="guestAmount">Guests</label>
            {errors.guestAmount && (
              <div className="text-danger small">{errors.guestAmount}</div>
            )}
            <input
              type="number"
              id="guestAmount"
              name="guestAmount"
              value={formState.guestAmount}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  );
}

export default EditBooking;
