import { NOROFF_API_URL } from "../../config";
import createApiKey from "../../apiAuth";

// Function to ensure the API key is available
async function ensureApiKey() {
  if (!sessionStorage.getItem("apiKey")) {
    await createApiKey();
  }
  return sessionStorage.getItem("apiKey");
}

// Function to edit booking with validation for optional fields
export async function editBooking(id, bookingData) {
  const url = `${NOROFF_API_URL}/holidaze/bookings/${id}`;
  const token = sessionStorage.getItem("accessToken");

  // Ensure an access token is available
  if (!token) {
    console.error("No access token available.");
    throw new Error(
      "You're not authorized to edit booking. Please sign in and try again."
    );
  }

  try {
    const apiKey = await ensureApiKey();
    const bodyData = {};

    // Only include fields that are set
    if (bookingData.dateFrom)
      bodyData.dateFrom = new Date(bookingData.dateFrom).toISOString();
    if (bookingData.dateTo)
      bodyData.dateTo = new Date(bookingData.dateTo).toISOString();
    if (typeof bookingData.guests === "number")
      bodyData.guests = bookingData.guests;

    console.log("Request URL:", url);
    console.log("Request Body Data:", bodyData);

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": apiKey,
      },
      body: JSON.stringify(bodyData),
    });

    // Check for a successful response or handle errors
    if (!response.ok) {
      const errorText = await response.text(); // Read the response body
      console.error(
        `Failed to update booking: HTTP ${response.status}`,
        errorText
      );
      throw new Error(
        `Failed to update booking: HTTP ${response.status} - ${errorText}`
      );
    }

    // Read and process the response
    const data = await response.json();
    if (data && data.data) {
      console.log("Booking updated successfully:", data.data);
      return true;
    } else {
      console.error("User data missing in the response:", data);
      return false;
    }
  } catch (error) {
    console.error("Error updating booking:", error);
    return false;
  }
}
