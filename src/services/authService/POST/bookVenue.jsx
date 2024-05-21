import { bookVenueUrl } from "../../config";
import createApiKey from "../../apiAuth";

// Function to book venue

async function ensureApiKey() {
  if (!sessionStorage.getItem("apiKey")) {
    await createApiKey();
  }
  return sessionStorage.getItem("apiKey");
}

export async function bookVenue({ dateFrom, dateTo, guests, venueId }) {
  const url = bookVenueUrl;
  const token = sessionStorage.getItem("accessToken");

  if (!token) {
    console.error("No access token available.");
    throw new Error(
      "You're not authorized to handle this request. Please sign in and try again."
    );
  }

  const apiKey = await ensureApiKey();

  if (token && apiKey) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": apiKey,
        },
        body: JSON.stringify({ dateFrom, dateTo, guests, venueId }),
      });

      if (!response.ok) {
        throw new Error(`Failed to book venue with status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error booking venue:", error);
      throw error;
    }
  }
}
