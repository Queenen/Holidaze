import React, { useState } from "react";
import styles from "./EditProfile.module.css";
import Button from "../../../../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { editProfile } from "../../../../services/authService/PUT/editProfile";
import { useUserStatus } from "../../../../context/UserStatus";

function EditProfile({ closeModal }) {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    bio: "",
    venueManager: false,
    bannerUrl: "",
    bannerAlt: "",
    avatarUrl: "",
    avatarAlt: "",
  });

  const { broadcastSessionChange } = useUserStatus();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "bannerUrl" && value.trim() && !formData.bannerAlt.trim()) {
      setErrors((prev) => ({
        ...prev,
        bannerAlt: "Please add an alternative description for the media file.",
      }));
    } else if (name === "bannerUrl" && !value.trim()) {
      setErrors((prev) => ({
        ...prev,
        bannerAlt: "",
        bannerUrl: "",
      }));
    }

    if (name === "avatarUrl" && value.trim() && !formData.avatarAlt.trim()) {
      setErrors((prev) => ({
        ...prev,
        avatarAlt: "Please add an alternative description for the media file.",
      }));
    } else if (name === "avatarUrl" && !value.trim()) {
      setErrors((prev) => ({
        ...prev,
        avatarAlt: "",
        avatarUrl: "",
      }));
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) {
      console.log("Validation failed");
      return;
    }

    const dataToSend = {
      ...(formData.bio.trim() && { bio: formData.bio }),
      venueManager: formData.venueManager,
      ...(formData.avatarUrl.trim() && {
        avatar: {
          url: formData.avatarUrl,
          alt: formData.avatarAlt,
        },
      }),
      ...(formData.bannerUrl.trim() && {
        banner: {
          url: formData.bannerUrl,
          alt: formData.bannerAlt,
        },
      }),
    };

    try {
      const success = await editProfile(dataToSend);
      if (success) {
        console.log("Profile edited successfully. Updated data:", dataToSend);
        sessionStorage.setItem("venueManager", formData.venueManager);
        broadcastSessionChange();
        closeModal();
      } else {
        console.error("Failed to update profile.");
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        apiError: error.message || "Failed to edit profile",
      }));
    }
  }

  const validateForm = () => {
    const newErrors = {};
    if (formData.avatarUrl.trim() && !formData.avatarAlt.trim()) {
      newErrors.avatarAlt =
        "Please add an alternative description for the media file.";
    }
    if (formData.bannerUrl.trim() && !formData.bannerAlt.trim()) {
      newErrors.bannerAlt =
        "Please add an alternative description for the media file.";
    }

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
        <h1 className={`mt-4`}>Edit Profile</h1>
        <div className="d-flex flex-column gap-5">
          <div className={`d-flex flex-column gap-2`}>
            <h2 className="fs-5">Biography</h2>
            <label htmlFor="bio">Bio</label>
            <textarea
              name="bio"
              id="bio"
              value={formData.bio}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className={`d-flex flex-column gap-2`}>
            <h2 className="fs-5">Venue Manager</h2>
            <div className={`d-flex gap-3 align-items-center`}>
              <input
                type="checkbox"
                id="venueManager"
                name="venueManager"
                onChange={handleChange}
              />
              <label htmlFor="venueManager">I'd like to host venues</label>
            </div>
          </div>
          <div className={`d-flex flex-column gap-2`}>
            <h2 className="fs-5">Avatar</h2>
            <label htmlFor="avatarUrl">Avatar URL</label>
            {errors.avatarUrl && (
              <div className="text-danger small">{errors.avatarUrl}</div>
            )}
            <input
              type="text"
              id="avatarUrl"
              name="avatarUrl"
              value={formData.avatarUrl}
              onChange={handleChange}
            />
            <label htmlFor="avatarAlt">Avatar Alt</label>
            {errors.avatarAlt && (
              <div className="text-danger small">{errors.avatarAlt}</div>
            )}
            <input
              type="text"
              id="avatarAlt"
              name="avatarAlt"
              value={formData.avatarAlt}
              onChange={handleChange}
            />
          </div>
          <div className={`d-flex flex-column gap-2`}>
            <h2 className="fs-5">Banner</h2>
            <label htmlFor="bannerUrl">Banner URL</label>
            {errors.bannerUrl && (
              <div className="text-danger small">{errors.bannerUrl}</div>
            )}
            <input
              type="text"
              id="bannerUrl"
              name="bannerUrl"
              value={formData.bannerUrl}
              onChange={handleChange}
            />
            <label htmlFor="bannerAlt">Banner Alt</label>
            {errors.bannerAlt && (
              <div className="text-danger small">{errors.bannerAlt}</div>
            )}
            <input
              type="text"
              id="bannerAlt"
              name="bannerAlt"
              value={formData.bannerAlt}
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

export default EditProfile;
