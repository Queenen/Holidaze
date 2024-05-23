import { NOROFF_API_URL } from "../../config";
import createApiKey from "../../apiAuth";

// Function to ensure the API key is available
async function ensureApiKey() {
  if (!sessionStorage.getItem("apiKey")) {
    await createApiKey();
  }
  return sessionStorage.getItem("apiKey");
}

// Function to create a new venue
export async function createVenue(venueData) {
  const token = sessionStorage.getItem("accessToken");
  const venueManager = sessionStorage.getItem("venueManager");

  // Check if the access token is available
  if (!token) {
    console.error("No access token available.");
    throw new Error(
      "You're not authorized to handle this request. Please sign in and try again."
    );
  }

  // Check if the user is a venue manager
  if (venueManager !== "true") {
    console.error("No venue manager role available.");
    throw new Error(
      "You're not authorized to handle this request. Please register as a venue manager."
    );
  }

  // Ensure the API key is available
  const apiKey = await ensureApiKey();

  // Proceed if both token and API key are available
  if (token && apiKey && venueManager === "true") {
    try {
      // Make the POST request to create the venue
      const response = await fetch(`${NOROFF_API_URL}/holidaze/venues`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": apiKey,
        },
        body: JSON.stringify(venueData),
      });

      // Check if the response is successful
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to create venue:", errorData.errors);
        throw new Error(
          `Failed to create venue: ${response.status} - ${
            errorData.message || "Unknown error"
          }`
        );
      }

      // Return the response data
      const data = await response.json();
      return data;
    } catch (error) {
      // Log and rethrow the error for further handling
      console.error("Error adding venue:", error);
      throw error;
    }
  }
}
