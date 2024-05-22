import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Loader from "../../../../components/Loader";
import styles from "./VenueInfo.module.css";
import TextTruncate from "../../../../components/TextTruncate";
import ViewLocationModal from "../ViewLocation";

function VenueInfo({ venue, loading, error }) {
  const [showModal, setShowModal] = useState(false);

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

  function showLocation(e) {
    e.preventDefault();
    e.stopPropagation();
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  return (
    <section
      className={`d-flex justify-content-center p-5 col-md-6 col-lg-8 order-1 ${styles.infoContainer}`}
    >
      {venue ? (
        <div className={`d-flex flex-column gap-4 w-100 ${styles.venueInfo}`}>
          <TextTruncate text={venue.name} className="fs-1 lh-base mb-3" />
          <div
            className="fst-italic d-flex gap-2 align-items-center btn bg-white rounded-5"
            onClick={showLocation}
          >
            <span>
              <FontAwesomeIcon icon={faLocationDot} />
            </span>
            {venue.location?.address ? (
              <TextTruncate text={venue.location.address} />
            ) : (
              "Undefined"
            )}
          </div>
          <div className="d-flex flex-column text-break">
            {venue.description ? (
              <TextTruncate
                text={venue.description}
                useMaxLength
                maxLength={400}
              />
            ) : (
              "Undefined"
            )}
          </div>
          <p>
            <span className="fw-bold">Price:</span> ${" "}
            {venue.price ? `${venue.price}` : "0"} per day
          </p>
        </div>
      ) : (
        <div>
          <p className="text-danger">
            No venue data available, please try again later.
          </p>
        </div>
      )}

      {showModal && <ViewLocationModal venue={venue} onClose={closeModal} />}
    </section>
  );
}

export default VenueInfo;
