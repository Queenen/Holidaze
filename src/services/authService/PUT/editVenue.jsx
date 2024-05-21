import { NOROFF_API_URL } from "../../config";
import createApiKey from "../../apiAuth";

// Function to ensure the API key is available
async function ensureApiKey() {
  if (!sessionStorage.getItem("apiKey")) {
    await createApiKey();
  }
  return sessionStorage.getItem("apiKey");
}

// Function to edit a venue with validation for optional fields
export async function editVenue(id, venueData) {
  const url = `${NOROFF_API_URL}/holidaze/venues/${id}`;
  const token = sessionStorage.getItem("accessToken");

  // Ensure an access token is available
  if (!token) {
    console.error("No access token available.");
    throw new Error(
      "You're not authorized to edit venue. Please sign in and try again."
    );
  }

  try {
    const apiKey = await ensureApiKey();
    const bodyData = {};

    // Only include fields that are set
    if (venueData.name) bodyData.name = venueData.name;
    if (venueData.description) bodyData.description = venueData.description;
    if (Array.isArray(venueData.media)) bodyData.media = venueData.media;
    if (typeof venueData.price === "number") bodyData.price = venueData.price;
    if (typeof venueData.maxGuests === "number")
      bodyData.maxGuests = venueData.maxGuests;
    if (typeof venueData.rating === "number")
      bodyData.rating = venueData.rating;

    if (venueData.meta) {
      bodyData.meta = {};
      if (typeof venueData.meta.wifi === "boolean")
        bodyData.meta.wifi = venueData.meta.wifi;
      if (typeof venueData.meta.parking === "boolean")
        bodyData.meta.parking = venueData.meta.parking;
      if (typeof venueData.meta.breakfast === "boolean")
        bodyData.meta.breakfast = venueData.meta.breakfast;
      if (typeof venueData.meta.pets === "boolean")
        bodyData.meta.pets = venueData.meta.pets;
    }

    if (venueData.location) {
      bodyData.location = {};
      if (venueData.location.address)
        bodyData.location.address = venueData.location.address;
      if (venueData.location.city)
        bodyData.location.city = venueData.location.city;
      if (venueData.location.zip)
        bodyData.location.zip = venueData.location.zip;
      if (venueData.location.country)
        bodyData.location.country = venueData.location.country;
      if (venueData.location.continent)
        bodyData.location.continent = venueData.location.continent;
      if (typeof venueData.location.lat === "number")
        bodyData.location.lat = venueData.location.lat;
      if (typeof venueData.location.lng === "number")
        bodyData.location.lng = venueData.location.lng;
    }

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": apiKey,
      },
      body: JSON.stringify(bodyData),
    });

    // Check for a successful response or handle errors
    if (!response.ok) {
      const errorText = await response.text(); // Read the response body
      console.error(
        `Failed to update venue: HTTP ${response.status}`,
        errorText
      );
      throw new Error(
        `Failed to update venue: HTTP ${response.status} - ${errorText}`
      );
    }

    // Read and process the response
    const data = await response.json();
    if (data && data.data) {
      return true;
    } else {
      console.error("Venue data missing in the response:", data);
      return false;
    }
  } catch (error) {
    console.error("Error updating venue:", error);
    return false;
  }
}
