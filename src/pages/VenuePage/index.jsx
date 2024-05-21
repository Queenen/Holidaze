import React from "react";
import VenueInfo from "./components/VenueInfo";
import Booking from "./components/Booking";
import { useSearchParams } from "react-router-dom";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import VenueCarousel from "./components/Carousel";
import { useFetchVenue } from "../../services/authService/GET/fetchVenueById";
import Loader from "../../components/Loader";

const VenuePage = () => {
  useDocumentTitle(`Holidaze | Venue`);
  const [searchParams] = useSearchParams();
  const venueId = searchParams.get("id");

  const { venue, loading, error } = useFetchVenue(venueId);

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {venue && (
        <>
          <VenueCarousel venue={venue.data} />
          <div className="d-md-flex">
            <VenueInfo venue={venue.data} loading={loading} error={error} />
            <Booking venue={venue} loading={loading} error={error} />
          </div>
        </>
      )}
    </div>
  );
};

export default VenuePage;
