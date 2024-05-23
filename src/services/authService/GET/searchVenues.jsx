import { searchVenueURL } from "../../config";

// Function to search venues
async function searchVenue(query) {
  try {
    const url = searchVenueURL.replace("<query>", encodeURIComponent(query));
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching venues:", error);
    return [];
  }
}

export default searchVenue;
