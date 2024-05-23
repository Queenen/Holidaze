import { NOROFF_API_URL } from "../../config";

// Function to fetch data from a specific endpoint
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

// Function to fetch all venues across all pages
export const fetchAllVenues = async () => {
  const endpoint = "/holidaze/venues?_bookings=true";
  let allVenues = [];
  let currentPage = 1;
  let isLastPage = false;

  while (!isLastPage) {
    try {
      const response = await fetchData(`${endpoint}&page=${currentPage}`);
      if (response && response.data && Array.isArray(response.data)) {
        allVenues = [...allVenues, ...response.data];
        isLastPage = response.meta.isLastPage;
        currentPage += 1;
      } else {
        console.error("Invalid data format or no data available");
        break;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      break;
    }
  }

  return allVenues;
};
