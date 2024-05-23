import React from "react";
import VenueInfo from "./components/VenueInfo";
import Booking from "./components/Booking";
import { useSearchParams } from "react-router-dom";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import VenueCarousel from "./components/Carousel";
import { useFetchVenue } from "../../services/authService/GET/fetchVenueById";
import LoadingError from "../../utils/LoadingError";

const VenuePage = () => {
  useDocumentTitle("Holidaze | Venue");
  const [searchParams] = useSearchParams();
  const venueId = searchParams.get("id");

  const { venue, loading, error } = useFetchVenue(venueId);

  return (
    <LoadingError loading={loading} error={error}>
      {venue && (
        <>
          <VenueCarousel venue={venue.data} />
          <div className="d-md-flex">
            <VenueInfo venue={venue.data} />
            <Booking venue={venue} />
          </div>
        </>
      )}
    </LoadingError>
  );
};

export default VenuePage;
