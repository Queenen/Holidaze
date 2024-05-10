import { bookVenueUrl } from "../../config";

// Function to book venue
export async function bookVenue(dateFrom, dateTo, guests, venueId) {
  const url = bookVenueUrl;
  const token = sessionStorage.getItem("accessToken");
  const apiKey = sessionStorage.getItem("apiKey");

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
