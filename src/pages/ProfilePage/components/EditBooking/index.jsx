import React, { useState, useEffect } from "react";
import Button from "../../../../components/Button";
import { FormContainer, FormGroup } from "../../../../components/Form";
import { Input } from "../../../../components/Input";
import { useUserStatus } from "../../../../context/UserStatus";
import { deleteBooking } from "../../../../services/authService/DELETE/deleteBooking";
import { editBooking } from "../../../../services/authService/PUT/editBooking";
import { fetchBookingById } from "../../../../services/authService/GET/fetchBookingById";
import { fetchVenueById } from "../../../../services/authService/GET/fetchVenueById";

function EditBooking({ closeModal, bookingData }) {
  const bookingId = bookingData.bookingId;
  const venueId = bookingData.id;
  const [formData, setFormData] = useState({
    dateFrom: "",
    dateTo: "",
    guests: "",
  });
  const [maxGuests, setMaxGuests] = useState(0);
  const [errors, setErrors] = useState({ apiErrors: [] });

  const { broadcastSessionChange } = useUserStatus();

  useEffect(() => {
    async function fetchBookingAndVenue() {
      try {
        const booking = await fetchBookingById(bookingId);

        // Convert date strings to YYYY-MM-DD format
        const dateFrom = booking.dateFrom ? booking.dateFrom.split("T")[0] : "";
        const dateTo = booking.dateTo ? booking.dateTo.split("T")[0] : "";

        setFormData({
          dateFrom,
          dateTo,
          guests: booking.guests.toString() || "",
        });

        const venue = await fetchVenueById(venueId);
        setMaxGuests(venue.data.maxGuests);
      } catch (error) {
        console.error("Failed to fetch booking data:", error);
      }
    }

    fetchBookingAndVenue();
  }, [bookingId, venueId]);

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
        if (parseInt(value, 10) > maxGuests) {
          newErrors.guests = `This venue allows a max of ${maxGuests} guests.`;
        } else {
          delete newErrors.guests;
        }
      }

      if (name === "dateFrom") {
        if (value < tomorrowString) {
          newErrors.dateFrom = "Start date cannot be earlier than tomorrow.";
        } else if (formData.dateTo && value > formData.dateTo) {
          newErrors.dateFrom = "Start date must be before the end date.";
        } else {
          delete newErrors.dateFrom;
        }

        if (formData.dateTo && value <= formData.dateTo) {
          delete newErrors.dateTo;
        }
      }

      if (name === "dateTo") {
        if (value < tomorrowString) {
          newErrors.dateTo = "End date cannot be earlier than tomorrow.";
        } else if (value < formData.dateFrom) {
          newErrors.dateTo = "End date must be after the start date.";
        } else {
          delete newErrors.dateTo;
        }

        if (formData.dateFrom && value >= formData.dateFrom) {
          delete newErrors.dateFrom;
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

    if (!formData.dateFrom.trim())
      newErrors.dateFrom = "Start date is required";
    if (formData.dateFrom < tomorrowString)
      newErrors.dateFrom = "Start date cannot be earlier than tomorrow.";
    if (!formData.dateTo.trim()) newErrors.dateTo = "End date is required";
    if (formData.dateTo < tomorrowString)
      newErrors.dateTo = "End date cannot be earlier than tomorrow.";
    if (formData.dateFrom >= formData.dateTo)
      newErrors.dateFrom = "Start date must be before the end date.";
    if (!formData.guests || isNaN(formData.guests) || formData.guests <= 0)
      newErrors.guests = "Guests must be a positive number";
    if (parseInt(formData.guests, 10) > maxGuests)
      newErrors.guests = `This venue allows a max of ${maxGuests} guests.`;

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

    const completeData = {
      dateFrom: formData.dateFrom,
      dateTo: formData.dateTo,
      guests: parseInt(formData.guests, 10),
    };

    try {
      await editBooking(bookingId, completeData);
      broadcastSessionChange();
      closeModal();
      setFormData({
        dateFrom: "",
        dateTo: "",
        guests: "",
      });
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        apiError: error.message || "Failed to update booking",
        apiErrors: error.errorData?.errors || [],
      }));
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you'd like to delete this booking?"
    );
    if (confirmed) {
      try {
        await deleteBooking(bookingId);
        broadcastSessionChange();
        alert("Booking deleted successfully");
        closeModal();
      } catch (error) {
        setErrors((prev) => ({
          ...prev,
          apiError: error.message || "Failed to delete booking",
          apiErrors: error.errorData?.errors || [],
        }));
      }
    }
  };

  return (
    <FormContainer
      formHeading="Edit Booking"
      closeModal={closeModal}
      handleSubmit={handleSubmit}
    >
      <FormGroup>
        <Input
          type="date"
          id="dateFrom"
          name="dateFrom"
          value={formData.dateFrom}
          handleChange={handleChange}
          placeholder="Enter Start Date"
          isLabel={true}
          label="Start Date"
          required={true}
          errorMessage={errors.dateFrom}
        />
      </FormGroup>
      <FormGroup>
        <Input
          type="date"
          id="dateTo"
          name="dateTo"
          value={formData.dateTo}
          handleChange={handleChange}
          placeholder="Enter End Date"
          isLabel={true}
          label="End Date"
          required={true}
          errorMessage={errors.dateTo}
        />
      </FormGroup>
      <FormGroup>
        <Input
          type="number"
          id="guests"
          name="guests"
          value={formData.guests}
          handleChange={handleChange}
          placeholder="Enter Number of Guests"
          isLabel={true}
          label="Guests"
          required={true}
          errorMessage={errors.guests}
        />
      </FormGroup>
      {errors.apiError && (
        <div className="text-danger small my-2">{errors.apiError}</div>
      )}
      {errors.apiErrors && errors.apiErrors.length > 0 && (
        <div className="text-danger small my-2">
          {errors.apiErrors.map((error, index) => (
            <div key={index}>{error.message}</div>
          ))}
        </div>
      )}
      <div className="d-flex flex-wrap justify-content-between gap-3">
        <Button type="submit" name="submitBtn" errorMessage={errors.submitBtn}>
          Update
        </Button>
        <Button
          type="button"
          name="deleteBtn"
          errorMessage={errors.submitBtn}
          variation="deleteBtn"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
    </FormContainer>
  );
}

export default EditBooking;
