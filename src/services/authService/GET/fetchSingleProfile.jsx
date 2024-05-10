import { NOROFF_API_URL } from "../../config";
import createApiKey from "../../apiAuth";

// Function to access user profile by ID
async function ensureApiKey() {
  if (!sessionStorage.getItem("apiKey")) {
    await createApiKey();
  }
  return sessionStorage.getItem("apiKey");
}

export async function fetchUserByID() {
  const userName = sessionStorage.getItem("userName");
  if (!userName) {
    console.error("No userName in sessionStorage.");
    return null;
  }

  const url = `${NOROFF_API_URL}/holidaze/profiles/${userName}`;
  const token = sessionStorage.getItem("accessToken");

  try {
    if (!token) {
      console.error("No access token available.");
      throw new Error(
        "You're not authorized to view this information. Please sign in and try again."
      );
    }

    const apiKey = await ensureApiKey();

    if (token && apiKey) {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": apiKey,
        },
      });

      if (!response.ok) {
        console.error(`Failed to fetch user by ID: ${response.status}`);
        throw new Error(`Failed to fetch user by ID: ${response.status}`);
      }

      const data = await response.json();
      if (data && data.data) {
        let userType = data.data.venueManager;
        return { ...data.data, venueManager: userType };
      } else {
        console.error("User data missing in the response:", data);
        return null;
      }
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}
