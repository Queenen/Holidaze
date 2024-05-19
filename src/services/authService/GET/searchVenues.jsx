import { searchVenueURL } from "../../config";

async function searchVenue(query) {
  try {
    const response = await fetch(`${searchVenueURL.replace("<query>", query)}`);
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
