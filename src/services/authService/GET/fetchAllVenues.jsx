import { NOROFF_API_URL } from "../../config";

// Function to fetch all venues
export const fetchData = async (endpoint, options = {}) => {
  const url = `${NOROFF_API_URL}${endpoint}`;
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
