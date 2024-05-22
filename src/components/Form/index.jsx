import React from "react";
import PropTypes from "prop-types";
import styles from "./Form.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

// FormGroup Component
export const FormGroup = ({ isHeading, groupHeading, children }) => {
  return (
    <div className={styles.formGroup}>
      {isHeading && (
        <h2 className="fs-4 fw-semibold mt-3 seasons">{groupHeading}</h2>
      )}
      <div className="form-group d-flex flex-column gap-2 my-3">{children}</div>
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
      <h1 className={`${styles.heading} mb-4 fs-2 fw-semibold seasons`}>
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
