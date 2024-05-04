// Base API URL
export const NOROFF_API_URL = "https://v2.api.noroff.dev";

// Function to get the venue URL
export const getVenueUrl = (venueId) =>
  `${NOROFF_API_URL}/holidaze/venues/${venueId}`;
