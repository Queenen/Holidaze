import { NOROFF_API_URL } from "./config";

/**
 * Generate the URL for fetching a venue by ID.
 * @param {string} venueId - The ID of the venue.
 * @returns {string} - The generated URL.
 * @throws {Error} - If the venueId is invalid.
 */
export function getVenueUrl(venueId) {
  if (!venueId || typeof venueId !== "string") {
    throw new Error("A valid venue ID is required");
  }
  return `${NOROFF_API_URL}/holidaze/venues/${venueId}`;
}
