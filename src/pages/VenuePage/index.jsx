import { VenueCarousel } from "./components/Carousel";
import VenueInfo from "./components/VenueInfo";
import Booking from "./components/Booking";
import { VenueProvider } from "../../context/VenueContext";
import { useSearchParams } from "react-router-dom";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const VenuePage = () => {
  useDocumentTitle(`Holidaze | Venue`);
  const [searchParams] = useSearchParams();
  const venueId = searchParams.get("id");
  return (
    <VenueProvider venueId={venueId}>
      <VenueCarousel />
      <VenueInfo />
      <Booking />
    </VenueProvider>
  );
};

export default VenuePage;
