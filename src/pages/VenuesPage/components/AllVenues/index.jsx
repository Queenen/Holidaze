import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { useFilter } from "../../../../context/FilterContext";
import VenueCard from "../../../../components/VenueCard";
import { fetchAllVenues } from "../../../../services/authService/GET/fetchAllVenues";
import FilterVenues from "../FilterVenues";
import styles from "./AllVenues.module.css";
import LoadingError from "../../../../utils/LoadingError";
import { v4 as uuidv4 } from "uuid";

function AllVenues() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { filter, setFilter } = useFilter();
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [additionalFilters, setAdditionalFilters] = useState({
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
  });

  useEffect(() => {
    const fetchVenues = async () => {
      setLoading(true);
      try {
        const fetchedVenues = await fetchAllVenues();
        if (Array.isArray(fetchedVenues)) {
          setVenues(fetchedVenues);
        } else {
          setError("No venues found or invalid data format.");
        }
      } catch (error) {
        setError("Error fetching venues: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  const applyAdditionalFilters = (venues) => {
    return venues.filter((venue) => {
      return (
        (!additionalFilters.wifi || venue.meta.wifi) &&
        (!additionalFilters.parking || venue.meta.parking) &&
        (!additionalFilters.breakfast || venue.meta.breakfast) &&
        (!additionalFilters.pets || venue.meta.pets)
      );
    });
  };

  const filteredVenues = filter
    ? applyAdditionalFilters(venues).sort((a, b) => {
        if (filter === "rating") return b.rating - a.rating;
        if (filter === "popular") return b.bookings.length - a.bookings.length;
        if (filter === "recent")
          return new Date(b.created) - new Date(a.created);
        return 0;
      })
    : applyAdditionalFilters(venues);

  return (
    <section className={`p-4 p-md-5 d-flex flex-column gap-3 my-3`}>
      <div className="d-flex justify-content-between mx-3">
        <h1 className="seasons fw-semibold fs-2">All Venues</h1>
        <FontAwesomeIcon
          icon={faSort}
          size="2x"
          onClick={() => setIsOpen(true)}
        />
      </div>

      <h2 className="fst-italic fs-5 ms-3 mb-4 defaultFont">
        Showing results by: {filter || "default"}
      </h2>

      <LoadingError loading={loading} error={error}>
        <div className={styles.venuesContainer}>
          {filteredVenues.length > 0
            ? filteredVenues.map((venue) => (
                <VenueCard key={uuidv4()} venue={venue} />
              ))
            : !error && <p>No venues available.</p>}
        </div>
      </LoadingError>

      <FilterVenues
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        filter={filter}
        setFilter={setFilter}
        additionalFilters={additionalFilters}
        setAdditionalFilters={setAdditionalFilters}
      />
    </section>
  );
}

export default AllVenues;
