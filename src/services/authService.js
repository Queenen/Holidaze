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
