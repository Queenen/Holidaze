import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import styles from "./VenueInfo.module.css";
import TextTruncate from "../../../../components/TextTruncate";
import ViewLocationModal from "../ViewLocation";
import LoadingError from "../../../../utils/LoadingError";

function VenueInfo({ venue, loading, error }) {
  const [showModal, setShowModal] = useState(false);

  const showLocation = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <LoadingError loading={loading} error={error}>
      <section
        className={`d-flex justify-content-center p-5 col-md-6 col-lg-7 col-xl-8 order-1 ${styles.infoContainer}`}
      >
        {venue ? (
          <div className={`d-flex flex-column gap-4 w-100 ${styles.venueInfo}`}>
            <TextTruncate
              text={venue.name}
              className="seasons fw-semibold fs-2"
            />
            <div
              className="fst-italic d-flex gap-2 my-2 align-items-center btn bg-white rounded-5 defaultFont"
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
            <div className="d-flex flex-column text-break defaultFont">
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
            <p className="fw-semibold">
              Price: $ {venue.price ? `${venue.price}` : "0"} per day
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
    </LoadingError>
  );
}

export default VenueInfo;
