import React, { useState, useEffect } from "react";
import styles from "./SignIn.module.css";
import { loginUser } from "../../services/authService/POST/signInUser";
import { useUserStatus } from "../../context/UserStatus";
import { fetchUserByID } from "../../services/authService/GET/fetchSingleProfile";
import { FormContainer, FormGroup } from "../Form";
import { Input } from "../Input";
import Button from "../Button";

function SignIn({ closeModal, onToggleAuth }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const { broadcastSessionChange } = useUserStatus();

  useEffect(() => {
    const savedEmail = sessionStorage.getItem("userEmail");
    if (savedEmail) {
      setFormData((prev) => ({ ...prev, email: savedEmail }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (name === "email") {
        if (!value.endsWith("@stud.noroff.no")) {
          newErrors.email = "Email must end with @stud.noroff.no";
        } else {
          delete newErrors.email;
        }
      } else if (name === "password") {
        if (value.length < 8) {
          newErrors.password = "Password must be at least 8 characters";
        } else {
          delete newErrors.password;
        }
      }
      return newErrors;
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.endsWith("@stud.noroff.no")) {
      newErrors.email = "Email must end with @stud.noroff.no";
    }
    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const determineUserRole = async () => {
    const userProfile = await fetchUserByID();
    if (userProfile) {
      sessionStorage.setItem("venueManager", userProfile.venueManager);
    } else {
      console.log("Failed to fetch user profile or no profile data returned.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await loginUser(formData);
        sessionStorage.setItem("accessToken", response.data.accessToken);
        sessionStorage.setItem("userName", response.data.name);
        sessionStorage.setItem("userEmail", response.data.email);
        await determineUserRole();
        broadcastSessionChange();
        closeModal();
      } catch (error) {
        setErrors((prev) => ({
          ...prev,
          apiError: error.message || "Failed to log in",
        }));
      }
    }
  };

  return (
    <FormContainer
      formHeading="Welcome Back!"
      closeModal={closeModal}
      handleSubmit={handleSubmit}
    >
      <FormGroup>
        <Input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          handleChange={handleChange}
          placeholder="Enter your email"
          required
          isLabel={true}
          label="Email"
          errorMessage={errors.email}
        />
      </FormGroup>
      <FormGroup>
        <Input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          handleChange={handleChange}
          placeholder="Enter your password"
          required
          isLabel={true}
          label="Password"
          errorMessage={errors.password || errors.apiError}
        />
      </FormGroup>
      <Button type="submit">Sign In</Button>
      <div
        className={`${styles.toggleModal} small d-flex align-items-center gap-3 justify-content-between`}
      >
        <p>Not registered yet?</p>
        <button className="btn p-0" onClick={onToggleAuth}>
          Sign up{" "}
          <span className="text-decoration-underline text-success">here</span>
        </button>
      </div>
    </FormContainer>
  );
}

export default SignIn;
