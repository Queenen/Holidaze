import React, { createContext, useContext } from "react";
import { useFetchVenue } from "../services/authService/GET/fetchVenueById";

const VenueContext = createContext();

export const useVenue = () => useContext(VenueContext);

export const VenueProvider = ({ venueId, children }) => {
  const { venue, loading, error } = useFetchVenue(venueId);

  return (
    <VenueContext.Provider value={{ venue, loading, error }}>
      {children}
    </VenueContext.Provider>
  );
};
