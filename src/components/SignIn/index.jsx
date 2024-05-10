import React, { useState, useEffect } from "react";
import Button from "../Button";
import styles from "./SignIn.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { loginUser } from "../../services/authService/POST/signInUser";
import { useUserContext } from "../../context/UserContext";
import { fetchUserByID } from "../../services/authService/GET/fetchSingleProfile";

function SignIn({ closeModal, onToggleAuth }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const { setGuest, setCustomer, setManager } = useUserContext();

  useEffect(() => {
    const savedEmail = sessionStorage.getItem("userEmail");
    if (savedEmail) {
      setFormData((prev) => ({ ...prev, email: savedEmail }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      if (userProfile.venueManager) {
        setManager();
      } else {
        setCustomer();
      }
    } else {
      console.log("Failed to fetch user profile or no profile data returned.");
      setGuest();
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
    <>
      <div className={styles.modalBackdrop}>
        <form
          onSubmit={handleSubmit}
          className={`gap-3 p-5 position-relative ${styles.form}`}
        >
          <FontAwesomeIcon
            icon={faCircleXmark}
            size="2x"
            className={styles.closeModal}
            onClick={closeModal}
          />
          <h1 className="mt-4">Welcome Back!</h1>
          <div className="d-flex flex-column">
            <label htmlFor="email">Email</label>
            {errors.email && (
              <div className="text-danger small">{errors.email}</div>
            )}
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="d-flex flex-column">
            <label htmlFor="password">Password</label>
            {errors.password && (
              <div className="text-danger small">{errors.password}</div>
            )}
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.apiError && (
              <div className="text-danger small">{errors.apiError}</div>
            )}
          </div>
          <div className="mt-4">
            <Button type="submit">Sign In</Button>
          </div>
          <div
            className={`small d-flex align-items-center gap-3 ms-auto ${styles.toggleModal}`}
          >
            <p>Not registered yet?</p>
            <button className="btn p-0" onClick={onToggleAuth}>
              Sign up <span className="text-decoration-underline">here</span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignIn;
