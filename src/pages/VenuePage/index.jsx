import { VenueCarousel } from "./components/Carousel";
import VenueInfo from "./components/VenueInfo";
import Booking from "./components/Booking";
import { VenueProvider } from "../../context/VenueContext";
import { useSearchParams } from "react-router-dom";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const VenuePage = () => {
  const [searchParams] = useSearchParams();
  const venueName = searchParams.get("name");
  const venueId = searchParams.get("id");
  useDocumentTitle(`Holidaze | ${venueName}`);
  return (
    <VenueProvider venueId={venueId}>
      <VenueCarousel />
      <VenueInfo />
      <Booking />
    </VenueProvider>
  );
};

export default VenuePage;
