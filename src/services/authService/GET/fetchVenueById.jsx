import { useState, useEffect } from "react";
import { NOROFF_API_URL } from "../../config";

// Custom hook to fetch venue by ID
export const useFetchVenue = (venueId) => {
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Return early if no venueId is provided
    if (!venueId) return;

    const fetchVenue = async () => {
      try {
        const url = `${NOROFF_API_URL}/holidaze/venues/${venueId}`;
        const response = await fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch venue with ID ${venueId}`);
        }

        const data = await response.json();
        setVenue(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVenue();
  }, [venueId]);

  return { venue, loading, error };
};

// Function to fetch venue by ID
export async function fetchVenueById(venueId) {
  if (!venueId) return null;

  try {
    const url = `${NOROFF_API_URL}/holidaze/venues/${venueId}`;
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch venue with ID ${venueId}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
