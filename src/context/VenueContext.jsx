import React, { createContext, useContext } from "react";
import { useFetchVenue } from "../services/authService/GET/fetchVenueById";

const VenueContext = createContext();

export const useVenue = () => useContext(VenueContext);

export const VenueProvider = ({ venueId, children }) => {
  // Use the custom hook to manage venue data fetching
  const { data: venue, loading, error } = useFetchVenue(venueId);

  // Provide the fetched data through the VenueContext
  return (
    <VenueContext.Provider value={{ venue, loading, error }}>
      {children}
    </VenueContext.Provider>
  );
};
