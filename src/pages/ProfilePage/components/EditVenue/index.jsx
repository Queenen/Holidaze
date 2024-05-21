import React, { useState } from "react";
import Button from "../../../../components/Button";
import { useUserStatus } from "../../../../context/UserStatus";
import { FormContainer, FormGroup } from "../../../../components/Form";
import { Input, TextArea } from "../../../../components/Input";
import { editVenue } from "../../../../services/authService/PUT/editVenue";
import { deleteVenue } from "../../../../services/authService/DELETE/deleteVenue";
import { getValidImageUrl } from "../../../../utils/imageValidation";

function EditVenue({ closeModal, venueData }) {
  const [formData, setFormData] = useState({
    venueName: venueData.name || "",
    description: venueData.description || "",
    mediaUrls: venueData.media
      ? venueData.media.map((media) => media.url).join(", ")
      : "",
    mediaAlt:
      venueData.media && venueData.media.length > 0
        ? venueData.media[0].alt
        : "",
    price: venueData.price !== undefined ? venueData.price.toString() : "",
    maxGuests:
      venueData.maxGuests !== undefined ? venueData.maxGuests.toString() : "",
    rating: venueData.rating !== undefined ? venueData.rating.toString() : "",
    wifi: venueData.meta ? venueData.meta.wifi : false,
    parking: venueData.meta ? venueData.meta.parking : false,
    breakfast: venueData.meta ? venueData.meta.breakfast : false,
    pets: venueData.meta ? venueData.meta.pets : false,
    address: venueData.location ? venueData.location.address : "",
    city: venueData.location ? venueData.location.city : "",
    zip: venueData.location ? venueData.location.zip : "",
    country: venueData.location ? venueData.location.country : "",
    continent: venueData.location ? venueData.location.continent : "",
    lat:
      venueData.location && venueData.location.lat !== null
        ? venueData.location.lat.toString()
        : "",
    lng:
      venueData.location && venueData.location.lng !== null
        ? venueData.location.lng.toString()
        : "",
  });

  const { broadcastSessionChange } = useUserStatus();
  const [errors, setErrors] = useState({ apiErrors: [] });

  const handleChange = async (e) => {
    const { name, value, type, checked } = e.target;
    const newFormData = {
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    };
    setFormData(newFormData);

    const newErrors = { ...errors };

    if (name === "mediaUrls") {
      const urls = value.split(",").map((url) => url.trim());
      for (const url of urls) {
        const validUrl = await getValidImageUrl(url);
        if (validUrl !== url) {
          newErrors.mediaUrls = "Please provide valid image URLs.";
          break;
        } else {
          delete newErrors.mediaUrls;
        }
      }
    }

    if (name === "price" && (isNaN(value) || value <= 0)) {
      newErrors.price = "Price must be a positive number";
    } else {
      delete newErrors.price;
    }

    if (name === "rating" && (isNaN(value) || value < 0)) {
      newErrors.rating = "Rating must be a positive number";
    } else {
      delete newErrors.rating;
    }

    if (
      name === "maxGuests" &&
      (isNaN(value) || value <= 0 || !Number.isInteger(Number(value)))
    ) {
      newErrors.maxGuests = "Max guests must be a positive integer";
    } else {
      delete newErrors.maxGuests;
    }

    if (name === "lat" && isNaN(parseFloat(value))) {
      newErrors.lat = "Latitude must be a valid number";
    } else {
      delete newErrors.lat;
    }

    if (name === "lng" && isNaN(parseFloat(value))) {
      newErrors.lng = "Longitude must be a valid number";
    } else {
      delete newErrors.lng;
    }

    setErrors(newErrors);
  };

  const validateForm = () => {
    const newErrors = {};
    if (formData.price && (isNaN(formData.price) || formData.price <= 0))
      newErrors.price = "Price must be a positive number";
    if (formData.rating && (isNaN(formData.rating) || formData.rating < 0))
      newErrors.rating = "Rating must be a positive number";
    if (
      formData.maxGuests &&
      (isNaN(formData.maxGuests) ||
        formData.maxGuests <= 0 ||
        !Number.isInteger(Number(formData.maxGuests)))
    )
      newErrors.maxGuests = "Max guests must be a positive and round number";
    if (formData.lat && isNaN(parseFloat(formData.lat)))
      newErrors.lat = "Latitude must be a valid number";
    if (formData.lng && isNaN(parseFloat(formData.lng)))
      newErrors.lng = "Longitude must be a valid number";

    if (Object.keys(newErrors).length > 0) {
      newErrors.submitBtn = "Please fix the error prompts before submitting";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert("Validation failed");
      return;
    }

    const mediaUrls = formData.mediaUrls.split(",").map((url) => url.trim());
    const media = await Promise.all(
      mediaUrls.map(async (url) => ({
        url: await getValidImageUrl(url),
        alt: formData.mediaAlt.trim(),
      }))
    );

    const location = {
      address: formData.address || undefined,
      city: formData.city || undefined,
      zip: formData.zip || undefined,
      country: formData.country || undefined,
      continent: formData.continent || undefined,
      lat: formData.lat ? parseFloat(formData.lat) : undefined,
      lng: formData.lng ? parseFloat(formData.lng) : undefined,
    };

    const completeData = {
      name: formData.venueName || undefined,
      description: formData.description || undefined,
      media: media.length > 0 ? media : undefined,
      price: formData.price ? parseFloat(formData.price) : undefined,
      maxGuests: formData.maxGuests
        ? parseInt(formData.maxGuests, 10)
        : undefined,
      rating: formData.rating ? parseFloat(formData.rating) : undefined,
      meta: {
        wifi: formData.wifi,
        parking: formData.parking,
        breakfast: formData.breakfast,
        pets: formData.pets,
      },
      location: Object.values(location).some((value) => value !== undefined)
        ? location
        : undefined,
    };

    try {
      await editVenue(venueData.id, completeData);
      broadcastSessionChange();
      alert("Venue updated successfully");
      closeModal();
      setFormData({
        venueName: "",
        description: "",
        mediaUrls: "",
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
        apiError: error.message || "Failed to update venue",
        apiErrors: error.errorData?.errors || [],
      }));
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you'd like to delete this venue?"
    );
    if (confirmed) {
      try {
        await deleteVenue(venueData.id);
        broadcastSessionChange();
        alert("Venue deleted successfully");
        closeModal();
      } catch (error) {
        setErrors((prev) => ({
          ...prev,
          apiError: error.message || "Failed to delete venue",
          apiErrors: error.errorData?.errors || [],
        }));
      }
    }
  };
  return (
    <FormContainer
      formHeading="Edit Venue"
      closeModal={closeModal}
      handleSubmit={handleSubmit}
    >
      <FormGroup>
        <Input
          type="text"
          id="venueName"
          name="venueName"
          value={formData.venueName || ""}
          handleChange={handleChange}
          placeholder="Enter Venue Name"
          isLabel={true}
          label="Venue Name"
          required={false}
          errorMessage={errors.venueName}
        />
      </FormGroup>
      <FormGroup>
        <TextArea
          value={formData.description || ""}
          handleChange={handleChange}
          placeholder="Enter Venue Description"
          id="description"
          name="description"
          isLabel={true}
          label="Description"
          required={false}
          errorMessage={errors.description}
        />
      </FormGroup>
      <FormGroup>
        <Input
          type="number"
          id="price"
          name="price"
          value={formData.price || ""}
          handleChange={handleChange}
          placeholder="Enter Price"
          isLabel={true}
          label="Price"
          required={false}
          errorMessage={errors.price}
        />
      </FormGroup>
      <FormGroup>
        <Input
          type="number"
          id="maxGuests"
          name="maxGuests"
          value={formData.maxGuests || ""}
          handleChange={handleChange}
          placeholder="Enter Max Guests"
          isLabel={true}
          label="Max Guests"
          required={false}
          errorMessage={errors.maxGuests}
        />
      </FormGroup>
      <FormGroup>
        <Input
          type="number"
          id="rating"
          name="rating"
          value={formData.rating !== undefined ? formData.rating : ""}
          handleChange={handleChange}
          placeholder="Enter Rating"
          isLabel={true}
          label="Rating"
          errorMessage={errors.rating}
        />
      </FormGroup>
      <FormGroup>
        <Input
          type="text"
          id="mediaUrls"
          name="mediaUrls"
          value={formData.mediaUrls || ""}
          handleChange={handleChange}
          placeholder="Enter Media URLs (separated by commas)"
          isLabel={true}
          label="Media URLs"
          errorMessage={errors.mediaUrls}
        />
        <Input
          type="text"
          id="mediaAlt"
          name="mediaAlt"
          value={formData.mediaAlt || ""}
          handleChange={handleChange}
          placeholder="Enter Media Alt Text"
          isLabel={true}
          label="Media Alt Text"
          errorMessage={errors.mediaAlt}
        />
      </FormGroup>
      <FormGroup>
        <h2>Facilities</h2>
        <Input
          className="checkbox"
          type="checkbox"
          id="wifi"
          name="wifi"
          handleChange={handleChange}
          isLabel={true}
          label="Wifi"
          checked={formData.wifi}
        />
        <Input
          className="checkbox"
          type="checkbox"
          id="parking"
          name="parking"
          handleChange={handleChange}
          isLabel={true}
          label="Parking"
          checked={formData.parking}
        />
        <Input
          className="checkbox"
          type="checkbox"
          id="breakfast"
          name="breakfast"
          handleChange={handleChange}
          isLabel={true}
          label="Breakfast"
          checked={formData.breakfast}
        />
        <Input
          className="checkbox"
          type="checkbox"
          id="pets"
          name="pets"
          handleChange={handleChange}
          isLabel={true}
          label="Pets"
          checked={formData.pets}
        />
      </FormGroup>
      <FormGroup>
        <h2>Location</h2>
        <Input
          type="text"
          id="address"
          name="address"
          value={formData.address || ""}
          handleChange={handleChange}
          placeholder="Enter Address"
          isLabel={true}
          label="Address"
          errorMessage={errors.address}
        />
        <Input
          type="text"
          id="city"
          name="city"
          value={formData.city || ""}
          handleChange={handleChange}
          placeholder="Enter City"
          isLabel={true}
          label="City"
          errorMessage={errors.city}
        />
        <Input
          type="text"
          id="zip"
          name="zip"
          value={formData.zip || ""}
          handleChange={handleChange}
          placeholder="Enter ZIP"
          isLabel={true}
          label="ZIP"
          errorMessage={errors.zip}
        />
        <Input
          type="text"
          id="country"
          name="country"
          value={formData.country || ""}
          handleChange={handleChange}
          placeholder="Enter Country"
          isLabel={true}
          label="Country"
          errorMessage={errors.country}
        />
        <Input
          type="text"
          id="continent"
          name="continent"
          value={formData.continent || ""}
          handleChange={handleChange}
          placeholder="Enter Continent"
          isLabel={true}
          label="Continent"
          errorMessage={errors.continent}
        />
        <Input
          type="number"
          id="lat"
          name="lat"
          value={formData.lat || ""}
          handleChange={handleChange}
          placeholder="Enter Latitude"
          isLabel={true}
          label="Latitude"
          errorMessage={errors.lat}
        />
        <Input
          type="number"
          id="lng"
          name="lng"
          value={formData.lng || ""}
          handleChange={handleChange}
          placeholder="Enter Longitude"
          isLabel={true}
          label="Longitude"
          errorMessage={errors.lng}
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
          errorMessage={errors.deleteBtn}
          variation="deleteBtn"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
    </FormContainer>
  );
}

export default EditVenue;
