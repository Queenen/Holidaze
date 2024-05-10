import { NOROFF_API_URL } from "./config";

// Function to create and store an API key
async function createApiKey(apiKeyName = "API Key") {
  const token = sessionStorage.getItem("accessToken");
  const response = await fetch(`${NOROFF_API_URL}/auth/create-api-key`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name: apiKeyName }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create API key with status: ${response.status}`);
  }

  const data = await response.json();
  sessionStorage.setItem("apiKey", data.data.key);
  return data;
}

export default createApiKey;
