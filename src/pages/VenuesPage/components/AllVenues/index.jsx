import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { FormContainer, FormGroup } from "../../../../components/Form";
import { Select, Option, Input } from "../../../../components/Input";
import Button from "../../../../components/Button";
import { Modal } from "react-bootstrap";
import { useFilter } from "../../../../context/FilterContext";
import VenueCard from "../../../../components/VenueCard";
import { fetchData } from "../../../../services/authService/GET/fetchAllVenues";
import styles from "./AllVenues.module.css";

export const fetchAllVenues = async () => {
  const endpoint = "/holidaze/venues?_bookings=true";
  const response = await fetchData(endpoint);
  return response ? response.data : null;
};

function AllVenues() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { filter, setFilter } = useFilter();
  const [venues, setVenues] = useState([]);
  const [additionalFilters, setAdditionalFilters] = useState({
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
  });

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const fetchedVenues = await fetchAllVenues();
        if (Array.isArray(fetchedVenues)) {
          setVenues(fetchedVenues);
        } else {
          console.error("No venues found or invalid data format.");
        }
      } catch (error) {
        console.error("Error fetching venues:", error);
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

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setAdditionalFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked,
    }));
  };

  const handleModalSave = () => {
    setIsOpen(false);
  };

  return (
    <section className={`p-4 p-md-5 d-flex flex-column gap-3 my-3`}>
      <div className="d-flex justify-content-between mx-3">
        <h1>All Venues</h1>
        <FontAwesomeIcon
          icon={faSort}
          size="2x"
          onClick={() => setIsOpen(true)}
        />
      </div>

      <h2 className="fst-italic fs-5 fw-normal ms-3 mb-4">
        Showing results by: {filter || "All"}
      </h2>

      <div className={styles.venuesContainer}>
        {filteredVenues.length > 0 ? (
          filteredVenues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))
        ) : (
          <p>No venues available.</p>
        )}
      </div>

      <Modal show={modalIsOpen} onHide={() => setIsOpen(false)}>
        <FormContainer formHeading="Filter Venue">
          <FormGroup>
            <Select onChange={handleFilterChange} value={filter || ""}>
              <Option value={""} disabled></Option>
              <Option value={"rating"}>Best Rated</Option>
              <Option value={"popular"}>Most Popular</Option>
              <Option value={"recent"}>Added Recently</Option>
            </Select>
          </FormGroup>
          <FormGroup>
            <Input
              className={`checkbox`}
              type="checkbox"
              id="wifi"
              name="wifi"
              isLabel={true}
              label="Wifi"
              checked={additionalFilters.wifi}
              onChange={handleCheckboxChange}
            />
            <Input
              className={`checkbox`}
              type="checkbox"
              id="parking"
              name="parking"
              isLabel={true}
              label="Parking"
              checked={additionalFilters.parking}
              onChange={handleCheckboxChange}
            />
            <Input
              className={`checkbox`}
              type="checkbox"
              id="breakfast"
              name="breakfast"
              isLabel={true}
              label="Breakfast"
              checked={additionalFilters.breakfast}
              onChange={handleCheckboxChange}
            />
            <Input
              className={`checkbox`}
              type="checkbox"
              id="pets"
              name="pets"
              isLabel={true}
              label="Pets"
              checked={additionalFilters.pets}
              onChange={handleCheckboxChange}
            />
          </FormGroup>

          <Button type="button" onClick={handleModalSave}>
            Save Changes
          </Button>
        </FormContainer>
      </Modal>
    </section>
  );
}

export default AllVenues;
