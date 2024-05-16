import React, { useState } from "react";
import Button from "../../../../components/Button";
import { useUserStatus } from "../../../../context/UserStatus";
import { FormContainer, FormGroup } from "../../../../components/Form";
import { Input, TextArea } from "../../../../components/Input";
import { editProfile } from "../../../../services/authService/PUT/editProfile";

function EditProfile({ closeModal }) {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    bio: "",
    venueManager: true,
    bannerUrl: "",
    bannerAlt: "",
    avatarUrl: "",
    avatarAlt: "",
  });

  const { broadcastSessionChange } = useUserStatus();

  const isValidImageUrl = (url) => {
    try {
      new URL(url);
      return /\.(jpg|jpeg|png|gif)$/i.test(url);
    } catch (e) {
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (name === "bannerUrl") {
        if (value.trim() && !formData.bannerAlt.trim()) {
          newErrors.bannerAlt = "Please add an alt description for the banner.";
        } else {
          delete newErrors.bannerAlt;
        }
        if (value.trim() && !isValidImageUrl(value.trim())) {
          newErrors.bannerUrl =
            "Please provide a valid image URL for the banner.";
        } else {
          delete newErrors.bannerUrl;
        }
      }

      if (name === "bannerAlt") {
        if (value.trim() && !formData.bannerUrl.trim()) {
          newErrors.bannerUrl = "Please provide a URL for the banner.";
        } else {
          delete newErrors.bannerUrl;
        }
      }

      if (name === "avatarUrl") {
        if (value.trim() && !formData.avatarAlt.trim()) {
          newErrors.avatarAlt = "Please add an alt description for the avatar.";
        } else {
          delete newErrors.avatarAlt;
        }
        if (value.trim() && !isValidImageUrl(value.trim())) {
          newErrors.avatarUrl =
            "Please provide a valid image URL for the avatar.";
        } else {
          delete newErrors.avatarUrl;
        }
      }

      if (name === "avatarAlt") {
        if (value.trim() && !formData.avatarUrl.trim()) {
          newErrors.avatarUrl = "Please provide a URL for the avatar.";
        } else {
          delete newErrors.avatarUrl;
        }
      }

      if (name === "bio") {
        if (value.trim().length > 160) {
          newErrors.bio = "The bio length cannot exceed 160 characters.";
        } else {
          delete newErrors.bio;
        }
      }

      return newErrors;
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.avatarUrl.trim() && !formData.avatarAlt.trim()) {
      newErrors.avatarAlt = "Please add an alt description for the avatar.";
    }

    if (formData.avatarAlt.trim() && !formData.avatarUrl.trim()) {
      newErrors.avatarUrl = "Please provide a URL for the avatar.";
    }

    if (
      formData.avatarUrl.trim() &&
      !isValidImageUrl(formData.avatarUrl.trim())
    ) {
      newErrors.avatarUrl = "Please provide a valid image URL for the avatar.";
    }

    if (formData.bannerUrl.trim() && !formData.bannerAlt.trim()) {
      newErrors.bannerAlt = "Please add an alt description for the banner.";
    }

    if (formData.bannerAlt.trim() && !formData.bannerUrl.trim()) {
      newErrors.bannerUrl = "Please provide a URL for the banner.";
    }

    if (
      formData.bannerUrl.trim() &&
      !isValidImageUrl(formData.bannerUrl.trim())
    ) {
      newErrors.bannerUrl = "Please provide a valid image URL for the banner.";
    }

    if (formData.bio.trim().length > 160) {
      newErrors.bio = "The bio length cannot exceed 160 characters.";
    }

    if (Object.keys(newErrors).length > 0) {
      newErrors.submitBtn = "Please fix the error prompts before submitting";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
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
  };
  return (
    <FormContainer
      formHeading="Edit Profile"
      closeModal={closeModal}
      handleSubmit={handleSubmit}
    >
      <FormGroup>
        <TextArea
          value={formData.bio}
          handleChange={handleChange}
          placeholder="Enter your bio"
          id="bio"
          name="bio"
          isLabel={true}
          label="Bio"
          errorMessage={errors.bio}
        />
      </FormGroup>
      <FormGroup>
        <Input
          className={`checkbox`}
          type="checkbox"
          id="venueManager"
          name="venueManager"
          handleChange={handleChange}
          isLabel={true}
          label="I'd like to host venues"
          checked={formData.venueManager}
        />
      </FormGroup>
      <FormGroup>
        <Input
          type="text"
          id="avatarUrl"
          name="avatarUrl"
          value={formData.avatarUrl}
          handleChange={handleChange}
          placeholder="Enter Avatar URL"
          isLabel={true}
          label="Avatar URL"
          errorMessage={errors.avatarUrl}
        />
        <Input
          type="text"
          id="avatarAlt"
          name="avatarAlt"
          value={formData.avatarAlt}
          handleChange={handleChange}
          placeholder="Enter Avatar Alt"
          isLabel={true}
          label="Avatar Alt"
          errorMessage={errors.avatarAlt}
        />
      </FormGroup>
      <FormGroup>
        <Input
          type="text"
          id="bannerUrl"
          name="bannerUrl"
          value={formData.bannerUrl}
          handleChange={handleChange}
          placeholder="Enter Banner URL"
          isLabel={true}
          label="Banner URL"
          errorMessage={errors.bannerUrl}
        />
        <Input
          type="text"
          id="bannerAlt"
          name="bannerAlt"
          value={formData.bannerAlt}
          handleChange={handleChange}
          placeholder="Enter Banner Alt"
          isLabel={true}
          label="Banner Alt"
          errorMessage={errors.bannerAlt}
        />
      </FormGroup>
      {errors.apiError && (
        <div className="text-danger small my-2">{errors.apiError}</div>
      )}
      <Button type="submit" name="submitBtn" errorMessage={errors.submitBtn}>
        Save Changes
      </Button>
    </FormContainer>
  );
}

export default EditProfile;
