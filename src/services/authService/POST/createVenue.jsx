import { NOROFF_API_URL } from "../../config";
import createApiKey from "../../apiAuth";

// Function to create venue
async function ensureApiKey() {
  if (!sessionStorage.getItem("apiKey")) {
    await createApiKey();
  }
  return sessionStorage.getItem("apiKey");
}

export async function createVenue(venueData) {
  const token = sessionStorage.getItem("accessToken");
  const venueManager = sessionStorage.getItem("venueManager");

  if (!token) {
    console.error("No access token available.");
    throw new Error(
      "You're not authorized to handle this request. Please sign in and try again."
    );
  }

  if (!venueManager) {
    console.error("No venue manager role available.");
    throw new Error(
      "You're not authorized to handle this request. Please register as a venue manager."
    );
  }

  const apiKey = await ensureApiKey();

  if (token && apiKey && venueManager) {
    try {
      const response = await fetch(`${NOROFF_API_URL}/holidaze/venues`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": apiKey,
        },
        body: JSON.stringify(venueData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to add venue: ${errorData.message}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error adding venue:", error);
      throw error;
    }
  }
}
