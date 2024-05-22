import { v4 as uuidv4 } from "uuid";
import React from "react";
import Loader from "../components/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const LoadingError = ({ loading, error, children, height }) => {
  if (loading) return <Loader />;

  if (error) {
    return (
      <div
        className="d-flex gap-2 align-items-center justify-content-center p-5"
        style={{ height }}
      >
        <FontAwesomeIcon icon={faCircleExclamation} color="red" />
        <p className="text-danger fs-5 fst-italic">
          <span className="fw-bold fst-normal me-2">Error:</span> {error}
        </p>
      </div>
    );
  }

  return (
    <>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { key: uuidv4() })
      )}
    </>
  );
};

LoadingError.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  children: PropTypes.node,
  height: PropTypes.string,
};

LoadingError.defaultProps = {
  height: "20rem",
  error: null,
};

export default LoadingError;
