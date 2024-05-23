import { fetchAllVenues } from "./fetchAllVenues";
import { getValidImageUrl } from "../../../utils/imageValidation";

const fallBackImage =
  "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?crop=entropy&fit=crop&h=900&q=80&w=1600";

// Function to fetch the 3 best-rated venues
export const fetchTopRatedVenues = async () => {
  try {
    const venues = await fetchAllVenues();

    if (Array.isArray(venues)) {
      // Sort by rating and get the top 3
      const topRatedVenues = venues
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3);

      // Validate media URLs and ensure required fields
      const validatedVenues = await Promise.all(
        topRatedVenues.map(async (venue) => {
          const validMedia =
            venue.media.length > 0
              ? await getValidImageUrl(venue.media[0].url)
              : fallBackImage;

          return {
            ...venue,
            media: [
              { url: validMedia, alt: venue.media[0]?.alt || "venue media" },
            ],
            name: venue.name || "Undefined",
            description: venue.description || "No description available",
            rating: venue.rating || "N/A",
            maxGuests: venue.maxGuests || 0,
            meta: venue.meta || {},
          };
        })
      );

      return validatedVenues;
    } else {
      console.error("No data available or data format is incorrect");
      return [];
    }
  } catch (error) {
    console.error("Error fetching top-rated venues:", error);
    return [];
  }
};

// Function to fetch 1 random venue media
export const fetchRandomVenueMedia = async () => {
  try {
    const venues = await fetchAllVenues();

    if (Array.isArray(venues)) {
      const shuffledVenues = shuffleArray(venues);
      const randomVenue = shuffledVenues[0];

      if (randomVenue && randomVenue.media && randomVenue.media.length > 0) {
        const firstMedia = await getValidImageUrl(randomVenue.media[0].url);
        return firstMedia;
      }
    }

    return fallBackImage;
  } catch (error) {
    console.error("Error fetching random venue media:", error);
    return fallBackImage;
  }
};

// Function to fetch 3 random venues
export const fetchRandomVenues = async () => {
  try {
    const venues = await fetchAllVenues();

    if (Array.isArray(venues)) {
      // Shuffle the array of venues
      const shuffledVenues = shuffleArray(venues);

      // Get the first 3 venues with necessary fields
      const randomVenues = shuffledVenues.slice(0, 3).map(async (venue) => {
        const validMedia =
          venue.media.length > 0
            ? await getValidImageUrl(venue.media[0].url)
            : fallBackImage;

        return {
          ...venue,
          media: [
            { url: validMedia, alt: venue.media[0]?.alt || "venue media" },
          ],
          name: venue.name || "Undefined",
          description: venue.description || "No description available",
          rating: venue.rating || "N/A",
          maxGuests: venue.maxGuests || 0,
          meta: venue.meta || {},
        };
      });

      return Promise.all(randomVenues);
    } else {
      console.error("Invalid data format for venues");
      return [];
    }
  } catch (error) {
    console.error("Error fetching random venues:", error);
    return [];
  }
};

// Function to shuffle an array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
