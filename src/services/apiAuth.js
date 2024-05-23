import { NOROFF_API_URL } from "./config";

// Function to create and store an API key
async function createApiKey(apiKeyName = "API Key") {
  try {
    const token = sessionStorage.getItem("accessToken");

    // Ensure the token exists before proceeding
    if (!token) {
      throw new Error("No access token found in session storage.");
    }

    const response = await fetch(`${NOROFF_API_URL}/auth/create-api-key`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: apiKeyName }),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to create API key with status: ${response.status}`
      );
    }

    const data = await response.json();
    sessionStorage.setItem("apiKey", data.data.key);
    return data;
  } catch (error) {
    console.error("Error creating API key:", error.message);
    throw error;
  }
}

export default createApiKey;
