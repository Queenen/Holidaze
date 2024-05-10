import React, { useState } from "react";
import Button from "../../../../components/Button";
import styles from "./AddVenueModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { createVenue } from "../../../../services/authService/POST/createVenue";

function AddVenueModal({ closeModal }) {
  const [formData, setFormData] = useState({
    venueName: "",
    description: "",
    mediaUrl: "",
    mediaAlt: "",
    price: "",
    maxGuests: "",
    rating: "",
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
    address: "",
    city: "",
    zip: "",
    country: "",
    continent: "",
    lat: "",
    lng: "",
  });
  const [errors, setErrors] = useState({});
  const [mediaUrls, setMediaUrls] = useState("");
  const [mediaAlt, setMediaAlt] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleMediaUrlChange = (event) => {
    setMediaUrls(event.target.value);
  };

  const handleMediaAltChange = (event) => {
    setMediaAlt(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare media data
    const media = mediaUrls.split(",").map((url) => ({
      url: url.trim(),
      alt: mediaAlt, // Assuming a common alt text for all images
    }));

    // Prepare location data
    const location = {
      address: formData.address,
      city: formData.city,
      zip: formData.zip,
      country: formData.country,
      continent: formData.continent,
      lat: parseFloat(formData.lat) || 0,
      lng: parseFloat(formData.lng) || 0,
    };

    // Consolidate all data
    const completeData = {
      name: formData.venueName,
      description: formData.description,
      media,
      price: parseFloat(formData.price),
      maxGuests: parseInt(formData.maxGuests, 10),
      rating: parseFloat(formData.rating) || 0,
      meta: {
        wifi: formData.wifi,
        parking: formData.parking,
        breakfast: formData.breakfast,
        pets: formData.pets,
      },
      location,
    };

    if (validateForm()) {
      try {
        const response = await createVenue(completeData);
        console.log("Venue added successfully:", response);
        closeModal();
        setFormData({
          venueName: "",
          description: "",
          mediaUrl: "",
          mediaAlt: "",
          price: "",
          maxGuests: "",
          rating: "",
          wifi: false,
          parking: false,
          breakfast: false,
          pets: false,
          address: "",
          city: "",
          zip: "",
          country: "",
          continent: "",
          lat: "",
          lng: "",
        });
      } catch (error) {
        setErrors((prev) => ({
          ...prev,
          apiError: error.message || "Failed to add venue",
        }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.venueName.trim())
      newErrors.venueName = "Venue name is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.price || isNaN(formData.price) || formData.price <= 0)
      newErrors.price = "Price must be a positive number";
    if (
      !formData.maxGuests ||
      isNaN(formData.maxGuests) ||
      formData.maxGuests <= 0
    )
      newErrors.maxGuests = "Max guests must be a positive number";
    if (formData.lat && isNaN(formData.lat))
      newErrors.lat = "Latitude must be a valid number";
    if (formData.lng && isNaN(formData.lng))
      newErrors.lng = "Longitude must be a valid number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
        <h1 className={`mt-4`}>Add Venue</h1>
        <div className="d-flex flex-column gap-3">
          <div className={`d-flex flex-column gap-2`}>
            <label htmlFor="venueName">Venue name*</label>
            {errors.venueName && (
              <div className="text-danger small">{errors.venueName}</div>
            )}
            <input
              type="text"
              id="venueName"
              name="venueName"
              value={formData.venueName}
              onChange={handleChange}
              required
            />
          </div>
          <div className={`d-flex flex-column gap-2`}>
            <label htmlFor="description">Description*</label>
            {errors.description && (
              <div className="text-danger small">{errors.description}</div>
            )}
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className={`d-flex flex-column gap-2`}>
            <label htmlFor="price">Price*</label>
            {errors.price && (
              <div className="text-danger small">{errors.price}</div>
            )}
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className={`d-flex flex-column gap-2`}>
            <label htmlFor="maxGuests">Max Guests*</label>
            {errors.maxGuests && (
              <div className="text-danger small">{errors.maxGuests}</div>
            )}
            <input
              type="number"
              id="maxGuests"
              name="maxGuests"
              value={formData.maxGuests}
              onChange={handleChange}
              required
            />
          </div>
          <div className={`d-flex flex-column gap-2`}>
            <label htmlFor="rating">Rating</label>
            {errors.rating && (
              <div className="text-danger small">{errors.rating}</div>
            )}
            <input
              type="number"
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="d-flex flex-column gap-3">
          <h2>Media</h2>
          <div className={`d-flex flex-column gap-2`}>
            <label htmlFor="mediaUrls">Media URLs (separated by commas)</label>
            <input
              type="text"
              id="mediaUrls"
              value={mediaUrls}
              onChange={handleMediaUrlChange}
            />
          </div>
          <div className={`d-flex flex-column gap-2`}>
            <label htmlFor="mediaAlt">Media Alt Text (common for all)</label>
            <input
              type="text"
              id="mediaAlt"
              value={mediaAlt}
              onChange={handleMediaAltChange}
            />
          </div>
        </div>
        <div className="d-flex flex-column gap-3">
          <h2>Facilities</h2>
          <div className={`d-flex gap-3`}>
            <input
              type="checkbox"
              id="wifi"
              name="wifi"
              checked={formData.wifi}
              onChange={handleChange}
            />
            <label htmlFor="wifi">Wifi</label>
          </div>
          <div className={`d-flex gap-3`}>
            <input
              type="checkbox"
              id="parking"
              name="parking"
              checked={formData.parking}
              onChange={handleChange}
            />
            <label htmlFor="parking">Parking</label>
          </div>
          <div className={`d-flex gap-3`}>
            <input
              type="checkbox"
              id="breakfast"
              name="breakfast"
              checked={formData.breakfast}
              onChange={handleChange}
            />
            <label htmlFor="breakfast">Breakfast</label>
          </div>
          <div className={`d-flex gap-3`}>
            <input
              type="checkbox"
              id="pets"
              name="pets"
              checked={formData.pets}
              onChange={handleChange}
            />
            <label htmlFor="pets">Pets</label>
          </div>
        </div>
        <div className="d-flex flex-column gap-3">
          <h2>Location</h2>
          <div className={`d-flex flex-column gap-2`}>
            <label htmlFor="address">Address</label>
            {errors.address && (
              <div className="text-danger small">{errors.address}</div>
            )}
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div className={`d-flex flex-column gap-2`}>
            <label htmlFor="city">City</label>
            {errors.city && (
              <div className="text-danger small">{errors.city}</div>
            )}
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          <div className={`d-flex flex-column gap-2`}>
            <label htmlFor="zip">ZIP</label>
            {errors.zip && (
              <div className="text-danger small">{errors.zip}</div>
            )}
            <input
              type="text"
              id="zip"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
            />
          </div>
          <div className={`d-flex flex-column gap-2`}>
            <label htmlFor="country">Country</label>
            {errors.country && (
              <div className="text-danger small">{errors.country}</div>
            )}
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
            />
          </div>
          <div className={`d-flex flex-column gap-2`}>
            <label htmlFor="continent">Continent</label>
            {errors.continent && (
              <div className="text-danger small">{errors.continent}</div>
            )}
            <input
              type="text"
              id="continent"
              name="continent"
              value={formData.continent}
              onChange={handleChange}
            />
          </div>
          <div className={`d-flex flex-column gap-2`}>
            <label htmlFor="lat">Latitude</label>
            {errors.lat && (
              <div className="text-danger small">{errors.lat}</div>
            )}
            <input
              type="number"
              id="lat"
              name="lat"
              value={formData.lat}
              onChange={handleChange}
            />
          </div>
          <div className={`d-flex flex-column gap-2`}>
            <label htmlFor="lng">Longitude</label>
            {errors.lng && (
              <div className="text-danger small">{errors.lng}</div>
            )}
            <input
              type="number"
              id="lng"
              name="lng"
              value={formData.lng}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <Button type="submit">Add Venue</Button>
        </div>
      </form>
    </div>
  );
}

export default AddVenueModal;
