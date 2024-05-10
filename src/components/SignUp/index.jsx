import React, { useState } from "react";
import Button from "../Button";
import styles from "./SignUp.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { registerUser } from "../../services/authService/POST/registerUser";

function SignUp({ closeModal, onToggleAuth }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    venueManager: false,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked && value === "manager" : value,
      venueManager: name === "venueManager" ? checked : prev.venueManager,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!/^[a-zA-Z]+$/.test(formData.name)) {
      newErrors.name = "No space or symbols allowed";
    }
    if (!formData.email.endsWith("@stud.noroff.no")) {
      newErrors.email = "Email must end with @stud.noroff.no";
    }
    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await registerUser(formData);
        sessionStorage.setItem("userName", formData.name);
        sessionStorage.setItem("userEmail", formData.email);
        sessionStorage.setItem("venueManager", formData.venueManager);
        alert("You're successfully registered!");
        onToggleAuth();
      } catch (error) {
        console.error("Registration failed:", error);
        setErrors({
          ...errors,
          apiError: "Registration failed. Please try again.",
        });
      }
    }
  };

  return (
    <>
      <div className={`${styles.modalBackdrop}`}>
        <form
          onSubmit={handleSubmit}
          className={`gap-3 p-5 position-relative ${styles.form}`}
        >
          <FontAwesomeIcon
            icon={faCircleXmark}
            size="2x"
            className={`${styles.closeModal}`}
            onClick={closeModal}
          />
          <h1 className={`mt-4`}>Create Account</h1>
          <div className={`d-flex flex-column `}>
            <label htmlFor="name">Name</label>
            {errors.name && (
              <div className="text-danger small">{errors.name}</div>
            )}
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={`d-flex flex-column `}>
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
          <div className={`d-flex flex-column `}>
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
          </div>
          <div className={`d-flex flex-column gap-3 my-3 ${styles.radio}`}>
            <div className={`d-flex gap-4`}>
              <input
                type="checkbox"
                id="customer"
                name="venueManager"
                value="customer"
                checked={!formData.venueManager}
                onChange={() =>
                  setFormData({ ...formData, venueManager: false })
                }
                disabled
              />
              <label htmlFor="customer">I would like to rent venues</label>
            </div>
            <div className={`d-flex gap-4`}>
              <input
                type="checkbox"
                id="manager"
                name="venueManager"
                value="manager"
                checked={formData.venueManager}
                onChange={handleChange}
              />
              <label htmlFor="manager">I would like to host venues</label>
            </div>
          </div>

          <Button type="submit">Sign Up</Button>
          <div
            className={`small d-flex align-items-center gap-3 ms-auto ${styles.toggleModal}`}
          >
            <p>Already registered?</p>
            <button className={`btn p-0`} onClick={onToggleAuth}>
              Sign in <span className="text-decoration-underline">here</span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignUp;
