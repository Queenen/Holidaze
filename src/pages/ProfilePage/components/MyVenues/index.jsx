import React, { useState, useEffect } from "react";
import styles from "./MyVenues.module.css";
import VenueCarousel from "../../../../components/Carousel";
import EditVenue from "../EditVenue";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

const MyVenues = ({ user, showEditButton = true }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState(null);

  useEffect(() => {
    setIsVisible(user.venues.length > 0);
  }, [user.venues.length]);

  const fetchUserVenues = async () => {
    return user.venues.map((venue) => ({
      id: venue.id,
      ...venue,
    }));
  };

  const toggleVenues = () => {
    setIsVisible(!isVisible);
  };

  const handleEditVenue = (e, venue) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedVenue(venue);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedVenue(null);
  };

  return (
    <section className={styles.myVenues}>
      <button className={styles.showVenues} onClick={toggleVenues}>
        {isVisible ? "Hide my venues" : "Show my venues"}
      </button>
      {isVisible && (
        <>
          {user.venues.length > 0 ? (
            <VenueCarousel
              fetchFunction={fetchUserVenues}
              showEditButton={showEditButton}
              height="25rem"
              onEditClick={handleEditVenue}
            >
              Edit Venue
            </VenueCarousel>
          ) : (
            <div className={styles.emptyContent}>
              <p className="text-danger">
                <FontAwesomeIcon
                  icon={faCircleExclamation}
                  color="red"
                  className="me-1"
                />
                You haven't added any venues yet.
              </p>
            </div>
          )}
        </>
      )}
      {showModal && (
        <EditVenue closeModal={closeModal} venueData={selectedVenue} />
      )}
    </section>
  );
};

export default MyVenues;
