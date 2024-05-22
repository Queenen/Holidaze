import HeroSection from "./components/HeroSection";
import AllVenues from "./components/AllVenues";
import { FilterProvider } from "../../context/FilterContext";
import useDocumentTitle from "../../hooks/useDocumentTitle";

function VenuesPage() {
  useDocumentTitle("Holidaze | Venues");

  return (
    <FilterProvider>
      <HeroSection />
      <AllVenues />
    </FilterProvider>
  );
}

export default VenuesPage;
