import { NOROFF_API_URL } from "../../config";
import createApiKey from "../../apiAuth";

async function ensureApiKey() {
  if (!sessionStorage.getItem("apiKey")) {
    await createApiKey();
  }
  return sessionStorage.getItem("apiKey");
}

export async function editProfile(profileData) {
  const userName = sessionStorage.getItem("userName");
  if (!userName) {
    console.error("No userName in sessionStorage.");
    return false;
  }

  const url = `${NOROFF_API_URL}/holidaze/profiles/${userName}`;
  const token = sessionStorage.getItem("accessToken");

  try {
    if (!token) {
      console.error("No access token available.");
      throw new Error(
        "You're not authorized to edit profile. Please sign in and try again."
      );
    }

    const apiKey = await ensureApiKey();

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": apiKey,
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      console.error(`Failed to edit profile: ${response.status}`);
      throw new Error(`Failed to edit profile: ${response.status}`);
    }

    sessionStorage.removeItem("apiKey");
    const data = await response.json();
    if (data && data.data) {
      return true;
    } else {
      console.error("User data missing in the response:", data);
      return false;
    }
  } catch (error) {
    console.error("Error editing profile:", error);
    return false;
  }
}
