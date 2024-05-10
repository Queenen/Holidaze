import { getVenueUrl } from "../../config";

//Function to fetch venue by ID
export async function fetchVenueById(venueId) {
  try {
    const url = getVenueUrl(venueId);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch venue with ID ${venueId}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching venue:", error);
    throw error;
  }
}
