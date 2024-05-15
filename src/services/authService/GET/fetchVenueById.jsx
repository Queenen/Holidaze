import { useEffect, useState } from "react";
import { getVenueUrl } from "../../config";

// Custom hook to fetch venue data by ID
export function useFetchVenue(venueId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Fetching venue with ID:", venueId);
    async function fetchVenue() {
      if (!venueId) return; // Skip if no venueId is provided

      setLoading(true);
      try {
        const url = getVenueUrl(venueId);
        const response = await fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch venue with ID ${venueId}`);
        }

        const { data } = await response.json();
        setData(data); // Set the entire venue data
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchVenue();
  }, [venueId]);

  return { data, loading, error };
}
