import { NOROFF_API_URL } from "../../config";
import createApiKey from "../../apiAuth";

// Function to ensure the API key is available
async function ensureApiKey() {
  if (!sessionStorage.getItem("apiKey")) {
    await createApiKey();
  }
  return sessionStorage.getItem("apiKey");
}

// Function to delete a booking by ID
export async function deleteBooking(bookingId) {
  const url = `${NOROFF_API_URL}/holidaze/bookings/${bookingId}`;
  const token = sessionStorage.getItem("accessToken");

  // Ensure an access token is available
  if (!token) {
    console.error("No access token available.");
    throw new Error(
      "You're not authorized to delete booking. Please sign in and try again."
    );
  }

  try {
    const apiKey = await ensureApiKey();

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": apiKey,
      },
    });

    // Check for a successful response or handle errors
    if (!response.ok) {
      const errorText = await response.text(); // Read the response body
      console.error(
        `Failed to delete booking: HTTP ${response.status}`,
        errorText
      );
      throw new Error(
        `Failed to delete booking: HTTP ${response.status} - ${errorText}`
      );
    }

    // No content is expected on a successful delete
    if (response.status === 204) {
      return true;
    } else {
      console.error("Unexpected response status:", response.status);
      return false;
    }
  } catch (error) {
    console.error("Error deleting booking:", error);
    return false;
  }
}
