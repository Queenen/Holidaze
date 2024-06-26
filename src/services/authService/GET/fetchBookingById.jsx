import { NOROFF_API_URL } from "../../config";
import createApiKey from "../../apiAuth";

// Function to ensure the API key is available
async function ensureApiKey() {
  if (!sessionStorage.getItem("apiKey")) {
    await createApiKey();
  }
  return sessionStorage.getItem("apiKey");
}

// Function to fetch a booking by ID
export async function fetchBookingById(id) {
  const url = `${NOROFF_API_URL}/holidaze/bookings/${id}`;
  const token = sessionStorage.getItem("accessToken");

  // Ensure an access token is available
  if (!token) {
    console.error("No access token available.");
    throw new Error(
      "You're not authorized to fetch booking. Please sign in and try again."
    );
  }

  try {
    const apiKey = await ensureApiKey();
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": apiKey,
      },
    });

    // Check for a successful response or handle errors
    if (!response.ok) {
      const errorText = await response.text(); // Read the response body
      console.error(
        `Failed to fetch booking: HTTP ${response.status}`,
        errorText
      );
      throw new Error(
        `Failed to fetch booking: HTTP ${response.status} - ${errorText}`
      );
    }

    // Parse and return the JSON data
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching booking:", error);
    throw error;
  }
}
