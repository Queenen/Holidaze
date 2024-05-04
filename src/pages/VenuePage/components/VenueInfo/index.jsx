import React from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Loader from "../../../../components/Loader";
import { fetchVenueById } from "../../../../services/authService";
import useApi from "../../../../services/useApi";
import styles from "./VenueInfo.module.css";

function VenueInfo() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  const {
    data: venueData,
    loading,
    errorMessage,
  } = useApi(fetchVenueById, [id]);

  if (loading) {
    return <Loader />;
  }

  if (errorMessage) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorMsg}>{errorMessage}</div>
      </div>
    );
  }

  return (
    <section
      className={`d-flex justify-content-center p-4 py-5 p-md-5 ${styles.infoContainer}`}
    >
      {venueData ? (
        <div className={`d-flex flex-column gap-3 ${styles.venueInfo}`}>
          <h1 className="mb-3">{venueData.name}</h1>
          <div className="d-flex gap-3 align-items-center">
            <p className="fst-italic">
              {venueData.location?.address
                ? `${venueData.location.address}`
                : "Unknown location"}
            </p>
            <FontAwesomeIcon icon={faLocationDot} />
          </div>
          <p>{venueData.description}</p>
          <p>
            <span className="fw-bold">Price:</span> $ {venueData.price} per day
          </p>
        </div>
      ) : (
        <div>No Venue Data</div>
      )}
    </section>
  );
}

export default VenueInfo;
