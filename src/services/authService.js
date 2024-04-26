import { NOROFF_API_URL } from "./config";

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

    // Log the data sent to the server
    console.log("Data sent to server:", userData);

    return await response.json();
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
}

// Function to log in a user
export async function loginUser(credentials) {
  try {
    const response = await fetch(`${NOROFF_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to log in: ${errorData.message}`);
    }

    // Log the credentials sent to the server
    console.log("Credentials sent to server:", credentials);

    const data = await response.json();
    sessionStorage.setItem("accessToken", data.data.accessToken);
    return data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}
