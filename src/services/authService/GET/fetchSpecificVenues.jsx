import { fetchData } from "./fetchAllVenues";

// Function to fetch the 3 best-rated venues
export const fetchTopRatedVenues = async () => {
  const endpoint = "/holidaze/venues";
  const venues = await fetchData(endpoint);

  if (venues && venues.data) {
    // Sort by rating and get the top 3
    const topRatedVenues = venues.data
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);
    return topRatedVenues;
  }

  console.error("No data available or data format is incorrect");
  return [];
};

// Function to fetch 3 random venues
export const fetchRandomVenues = async () => {
  const endpoint = "/holidaze/venues";
  const venues = await fetchData(endpoint);

  if (venues && venues.data && Array.isArray(venues.data)) {
    // Shuffle the array of venues
    const shuffledVenues = shuffleArray(venues.data);

    // Get the first 3 venues
    const randomVenues = shuffledVenues.slice(0, 3);
    return randomVenues;
  }

  console.error("Invalid data format for venues");
  return [];
};

// Function to shuffle an array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
