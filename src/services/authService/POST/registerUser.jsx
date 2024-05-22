import { NOROFF_API_URL } from "../../config";

// Function to register a user
export async function registerUser(userData) {
  try {
    const response = await fetch(`${NOROFF_API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to register user: ${errorData.message}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
}
