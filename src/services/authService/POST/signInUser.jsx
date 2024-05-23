import { NOROFF_API_URL } from "../../config";

// Function to sign in user
export async function loginUser(credentials) {
  try {
    const response = await fetch(`${NOROFF_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (response.status === 401) {
      throw new Error(
        `Failed to sign in. Please try a different email or password.`
      );
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to sign in: ${errorData.message}`);
    }

    const data = await response.json();
    sessionStorage.setItem("accessToken", data.data.accessToken);
    return data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}
