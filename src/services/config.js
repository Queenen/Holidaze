// Base API URL
export const NOROFF_API_URL = "https://v2.api.noroff.dev";

// Function to get the venue URL by ID
export const getVenueUrl = (venueId) =>
  `${NOROFF_API_URL}/holidaze/venues/${venueId}`;

// URL to get all venues
export const allVenuesURL = `${NOROFF_API_URL}/holidaze/venues/`;

// URL to book a venue
export const bookVenueUrl = `${NOROFF_API_URL}/holidaze/bookings`;

// URL for searching venues
export const searchVenueURL = `${NOROFF_API_URL}/holidaze/venues/search?q=<query>`;
