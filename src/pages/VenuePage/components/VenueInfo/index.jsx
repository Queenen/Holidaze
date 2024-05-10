import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Loader from "../../../../components/Loader";
import { useVenue } from "../../../../context/VenueContext";
import styles from "./VenueInfo.module.css";

function VenueInfo() {
  const { venue, loading, error } = useVenue();

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorMsg}>{error}</div>
      </div>
    );
  }

  return (
    <section
      className={`d-flex justify-content-center p-5 ${styles.infoContainer}`}
    >
      {venue ? (
        <div className={`d-flex flex-column gap-3 w-100 ${styles.venueInfo}`}>
          <h1 className="mb-3">{venue.name}</h1>
          <p className="fst-italic">
            {" "}
            <span className="me-2">
              <FontAwesomeIcon icon={faLocationDot} />
            </span>
            {venue.location?.address
              ? venue.location.address
              : "Unknown location"}
          </p>
          <p>{venue.description}</p>
          <p>
            <span className="fw-bold">Price:</span> $ {venue.price} per day
          </p>
        </div>
      ) : (
        <div>
          <p className="text-danger">
            No venue data available, please try again later.
          </p>
        </div>
      )}
    </section>
  );
}

export default VenueInfo;
