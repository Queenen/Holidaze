import React, { useState } from "react";
import Button from "../../../../components/Button";
import { FormContainer, FormGroup } from "../../../../components/Form";
import { Input, TextArea } from "../../../../components/Input";
import { useUserStatus } from "../../../../context/UserStatus";
import { createVenue } from "../../../../services/authService/POST/createVenue";
import { getValidImageUrl } from "../../../../utils/imageValidation";

function AddVenueModal({ closeModal }) {
  const [formData, setFormData] = useState({
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

    setErrors(newErrors);
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
    if (formData.mediaUrls && !formData.mediaAlt.trim())
      newErrors.mediaAlt =
        "Media alt text is required when media URLs are provided";

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
      address: formData.address,
      city: formData.city,
      zip: formData.zip,
      country: formData.country,
      continent: formData.continent,
      lat: parseFloat(formData.lat) || 0,
      lng: parseFloat(formData.lng) || 0,
    };

    const completeData = {
      name: formData.venueName,
      description: formData.description,
      media: media.length > 0 ? media : undefined,
      price: parseFloat(formData.price),
      maxGuests: parseInt(formData.maxGuests, 10),
      rating: parseFloat(formData.rating) || 0,
      meta: {
        wifi: formData.wifi,
        parking: formData.parking,
        breakfast: formData.breakfast,
        pets: formData.pets,
      },
      location: Object.values(location).some(
        (value) => value !== "" && value !== 0
      )
        ? location
        : undefined,
    };

    try {
      await createVenue(completeData);
      broadcastSessionChange();
      alert("Venue added successfully");
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
        apiError: error.message || "Failed to add venue",
        apiErrors: error.errorData?.errors || [],
      }));
    }
  };

  return (
    <FormContainer
      formHeading="Create Venue"
      closeModal={closeModal}
      handleSubmit={handleSubmit}
    >
      <FormGroup>
        <Input
          type="text"
          id="venueName"
          name="venueName"
          value={formData.venueName || ""}
          onChange={handleChange}
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
          onChange={handleChange}
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
          onChange={handleChange}
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
          onChange={handleChange}
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
          onChange={handleChange}
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
          onChange={handleChange}
          placeholder="Enter Media Alt Text"
          isLabel={true}
          label="Media Alt Text"
          errorMessage={errors.mediaAlt}
        />
      </FormGroup>
      <FormGroup isHeading groupHeading={"Facilities"}>
        <Input
          className="checkbox"
          type="checkbox"
          id="wifi"
          name="wifi"
          onChange={handleChange}
          isLabel={true}
          label="Wifi"
          checked={formData.wifi}
        />
        <Input
          className="checkbox"
          type="checkbox"
          id="parking"
          name="parking"
          onChange={handleChange}
          isLabel={true}
          label="Parking"
          checked={formData.parking}
        />
        <Input
          className="checkbox"
          type="checkbox"
          id="breakfast"
          name="breakfast"
          onChange={handleChange}
          isLabel={true}
          label="Breakfast"
          checked={formData.breakfast}
        />
        <Input
          className="checkbox"
          type="checkbox"
          id="pets"
          name="pets"
          onChange={handleChange}
          isLabel={true}
          label="Pets"
          checked={formData.pets}
        />
      </FormGroup>
      <FormGroup isHeading groupHeading={"Location"}>
        <Input
          type="text"
          id="address"
          name="address"
          value={formData.address || ""}
          onChange={handleChange}
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
          onChange={handleChange}
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
          onChange={handleChange}
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
          onChange={handleChange}
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
          onChange={handleChange}
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
          onChange={handleChange}
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
          onChange={handleChange}
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
      <Button type="submit" name="submitBtn" errorMessage={errors.submitBtn}>
        Create
      </Button>
    </FormContainer>
  );
}

export default AddVenueModal;
