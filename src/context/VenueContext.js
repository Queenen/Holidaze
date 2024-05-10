import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchVenueById } from "../services/authService/GET/fetchVenueById";

const VenueContext = createContext();

export const useVenue = () => useContext(VenueContext);

export const VenueProvider = ({ venueId, children }) => {
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await fetchVenueById(venueId);
        setVenue(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (venueId) {
      fetchData();
    }
  }, [venueId]);

  return (
    <VenueContext.Provider value={{ venue, loading, error }}>
      {children}
    </VenueContext.Provider>
  );
};
