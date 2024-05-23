import { NOROFF_API_URL } from "../../config";
import createApiKey from "../../apiAuth";

// Function to ensure the API key is available
async function ensureApiKey() {
  if (!sessionStorage.getItem("apiKey")) {
    await createApiKey();
  }
  return sessionStorage.getItem("apiKey");
}

// Function to fetch user profile by ID
export async function fetchUserByID() {
  const userName = sessionStorage.getItem("userName");

  // Return null if userName is not found in sessionStorage
  if (!userName) {
    return null;
  }

  const url = `${NOROFF_API_URL}/holidaze/profiles/${userName}?_bookings=true&_venues=true`;
  const token = sessionStorage.getItem("accessToken");

  // Ensure an access token is available
  if (!token) {
    console.error("No access token available.");
    throw new Error(
      "You're not authorized to view this information. Please sign in and try again."
    );
  }

  try {
    const apiKey = await ensureApiKey();

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": apiKey,
      },
    });

    // Check for a successful response or handle errors
    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Failed to fetch user by ID: HTTP ${response.status}`,
        errorText
      );
      throw new Error(
        `Failed to fetch user by ID: HTTP ${response.status} - ${errorText}`
      );
    }

    // Parse and return the JSON data
    const data = await response.json();

    // Clear the API key from sessionStorage after the request
    sessionStorage.removeItem("apiKey");

    if (data && data.data) {
      const userType = data.data.venueManager;
      return { ...data.data, venueManager: userType };
    } else {
      console.error("User data missing in the response:", data);
      return null;
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}
