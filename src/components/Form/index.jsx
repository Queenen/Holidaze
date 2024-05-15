// components/Form/index.jsx
import React from "react";
import PropTypes from "prop-types";
import styles from "./Form.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

// FormGroup Component
export const FormGroup = ({ isHeading, groupHeading, children }) => {
  return (
    <div>
      {isHeading && <h2 className="fs-5 fw-semibold mt-3">{groupHeading}</h2>}
      <div className="form-group d-flex flex-column">{children}</div>
    </div>
  );
};

FormGroup.propTypes = {
  isHeading: PropTypes.bool,
  groupHeading: PropTypes.string,
  children: PropTypes.node,
};

FormGroup.defaultProps = {
  isHeading: false,
  groupHeading: "",
};

// Form Component
const Form = ({ handleSubmit, children }) => {
  return (
    <form
      onSubmit={handleSubmit}
      className={`${styles.form} d-flex flex-column gap-3`}
    >
      {children}
    </form>
  );
};

Form.propTypes = {
  handleSubmit: PropTypes.func,
  children: PropTypes.node,
};

// Container Component
const Container = ({ formHeading, closeModal, children }) => {
  return (
    <div
      className={`container my-5 rounded-5 position-relative d-flex flex-column align-items-center ${styles.formContainer}`}
    >
      <FontAwesomeIcon
        icon={faCircleXmark}
        className={styles.closeIcon}
        onClick={closeModal}
      />
      <h1 className={`${styles.heading} mb-4 fs-2 fw-semibold`}>
        {formHeading}
      </h1>
      {children}
    </div>
  );
};

Container.propTypes = {
  formHeading: PropTypes.string,
  children: PropTypes.node,
};

// FormContainer Component
export const FormContainer = ({
  formHeading,
  closeModal,
  handleSubmit,
  children,
}) => {
  return (
    <div className={styles.modalBackdrop}>
      <Container formHeading={formHeading} closeModal={closeModal}>
        <Form handleSubmit={handleSubmit}>{children}</Form>
      </Container>
    </div>
  );
};

FormContainer.propTypes = {
  formHeading: PropTypes.string,
  handleSubmit: PropTypes.func,
  children: PropTypes.node,
};

export default FormContainer;

// Example usage:
/*
import React, { useState } from "react";
import { FormContainer, FormGroup } from "./src/components/Form";
import { Input, TextArea, Select, Option } from "./src/components/Input";
import Button from "./src/components/Button";

const Example = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission logic here
  };

  return (
    <FormContainer formHeading="Example Form" handleSubmit={handleSubmit}>
      <FormGroup isHeading={true} groupHeading="Login credentials"></FormGroup>
      <Input label="Name *" required={true} onChange={handleChange} />
      <Input
        isLabel={true}
        label="Pick Date *"
        required={true}
        type="date"
        onChange={handleChange}
      />
      <TextArea
        label="Comment *"
        required={true}
        onChange={handleChange}
      ></TextArea>
      <Select
        label="Favorite Pet (optional)"
        defaultValue=""
        onChange={handleChange}
      >
        <Option value="">Select Pet</Option>
        <Option value="dog">Dog</Option>
        <Option value="cat">Cat</Option>
        <Option value="bunny">Bunny</Option>
      </Select>
      <Button onClick={handleSubmit}>Submit</Button>
    </FormContainer>
  );
};

export default Example;*/
