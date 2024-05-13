import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Loader from "../../../../components/Loader";
import { useVenue } from "../../../../context/VenueContext";
import styles from "./VenueInfo.module.css";
import TextTruncate from "../../../../components/TextTruncate";

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
      className={`d-flex justify-content-center p-5 col-md-6 col-lg-8 order-1 ${styles.infoContainer}`}
    >
      {venue ? (
        <div className={`d-flex flex-column gap-3 w-100 ${styles.venueInfo}`}>
          <TextTruncate text={venue.name} maxLength={22} className="fs-1" />
          <div className="fst-italic d-flex gap-2 align-items-center">
            <span>
              <FontAwesomeIcon icon={faLocationDot} />
            </span>
            {venue.location?.address ? (
              <TextTruncate text={venue.location.address} maxLength={22} />
            ) : (
              "Unknown location"
            )}
          </div>
          <p>
            {" "}
            <TextTruncate
              text={venue.description}
              maxLength={300}
              className="lh-lg my-3"
            />
          </p>
          <p className="my-3">
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
