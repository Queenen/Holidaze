import { fetchAllVenues } from "./fetchAllVenues";

// Function to fetch the 3 best-rated venues
export const fetchTopRatedVenues = async () => {
  const venues = await fetchAllVenues();

  if (Array.isArray(venues)) {
    // Sort by rating and get the top 3
    const topRatedVenues = venues
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);
    return topRatedVenues;
  }

  console.error("No data available or data format is incorrect");
  return [];
};

// Function to fetch 1 random venue media
const fallBackImage =
  "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?crop=entropy&fit=crop&h=900&q=80&w=1600";
export const fetchRandomVenueMedia = async () => {
  const venues = await fetchAllVenues();

  if (Array.isArray(venues)) {
    // Shuffle the array of venues
    const shuffledVenues = shuffleArray(venues);

    // Get the first venue
    const randomVenue = shuffledVenues[0];

    if (randomVenue && randomVenue.media && randomVenue.media.length > 0) {
      const firstMedia = randomVenue.media[0].url;
      return firstMedia;
    }
  }

  return fallBackImage; // Return fallback image if no valid media is found
};

// Function to fetch 3 random venues
export const fetchRandomVenues = async () => {
  const venues = await fetchAllVenues();

  if (Array.isArray(venues)) {
    // Shuffle the array of venues
    const shuffledVenues = shuffleArray(venues);

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
