import React, { useState } from "react";
import { registerUser } from "../../services/authService/POST/registerUser";
import { useUserStatus } from "../../context/UserStatus";
import { FormContainer, FormGroup } from "../Form";
import { Input } from "../Input";
import Button from "../Button";

function SignUp({ closeModal, onToggleAuth }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    venueManager: false,
  });
  const [errors, setErrors] = useState({});
  const { broadcastSessionChange } = useUserStatus();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      venueManager: name === "venueManager" ? checked : prev.venueManager,
    }));

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (name === "name") {
        if (!/^[a-zA-Z]+$/.test(value)) {
          newErrors.name = "No space or symbols allowed";
        } else {
          delete newErrors.name;
        }
      } else if (name === "email") {
        if (!value.endsWith("@stud.noroff.no")) {
          newErrors.email = "Email must end with @stud.noroff.no";
        } else {
          delete newErrors.email;
        }
      } else if (name === "password") {
        if (value.length < 8) {
          newErrors.password = "Password must be at least 8 characters long";
        } else {
          delete newErrors.password;
        }
      }
      return newErrors;
    });
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
        broadcastSessionChange();
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
    <FormContainer
      formHeading="Create Account"
      closeModal={closeModal}
      handleSubmit={handleSubmit}
    >
      <FormGroup>
        <Input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          required
          isLabel={true}
          label="Name"
          errorMessage={errors.name}
        />
      </FormGroup>
      <FormGroup>
        <Input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
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
          onChange={handleChange}
          placeholder="Enter your password"
          required
          isLabel={true}
          label="Password"
          errorMessage={errors.password}
        />
      </FormGroup>
      <FormGroup>
        <div className={`d-flex flex-column gap-3 my-3`}>
          <div className={`d-flex gap-4`}>
            <input
              type="checkbox"
              id="customer"
              name="customer"
              value="customer"
              checked={true}
              onChange={() => setFormData({ ...formData, venueManager: false })}
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
      </FormGroup>
      {errors.apiError && (
        <div className="text-danger small my-2">{errors.apiError}</div>
      )}
      <Button type="submit">Sign Up</Button>
      <div
        className={`small d-flex align-items-center gap-3 justify-content-between`}
      >
        <p>Already registered?</p>
        <button className="btn p-0 defaultFont" onClick={onToggleAuth}>
          Sign in{" "}
          <span className="text-decoration-underline text-success">here</span>
        </button>
      </div>
    </FormContainer>
  );
}

export default SignUp;
