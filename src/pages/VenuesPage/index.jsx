//import styles from "./Venues.module.css";
import HeroSection from "./components/HeroSection";
import AllVenues from "./components/AllVenues";
import { FilterProvider } from "../../context/FilterContext";

function VenuesPage() {
  return (
    <FilterProvider>
      <HeroSection />
      <AllVenues />
    </FilterProvider>
  );
}

export default VenuesPage;
