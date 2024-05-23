import { bookVenueUrl } from "../../config";
import createApiKey from "../../apiAuth";

// Function to ensure the API key is available
async function ensureApiKey() {
  if (!sessionStorage.getItem("apiKey")) {
    await createApiKey();
  }
  return sessionStorage.getItem("apiKey");
}

// Function to book a venue
export async function bookVenue({ dateFrom, dateTo, guests, venueId }) {
  const url = bookVenueUrl;
  const token = sessionStorage.getItem("accessToken");

  // Check if the access token is available
  if (!token) {
    console.error("No access token available.");
    throw new Error(
      "You're not authorized to handle this request. Please sign in and try again."
    );
  }

  // Ensure the API key is available
  const apiKey = await ensureApiKey();

  // Proceed if both token and API key are available
  if (token && apiKey) {
    try {
      // Make the POST request to book the venue
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": apiKey,
        },
        body: JSON.stringify({ dateFrom, dateTo, guests, venueId }),
      });

      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`Failed to book venue with status: ${response.status}`);
      }

      // Return the response data
      return await response.json();
    } catch (error) {
      // Log and rethrow the error for further handling
      console.error("Error booking venue:", error);
      throw error;
    }
  }
}
