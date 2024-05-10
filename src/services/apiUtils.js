import { NOROFF_API_URL } from "./config";

export function getVenueUrl(venueId) {
  if (!venueId || typeof venueId !== "string") {
    throw new Error("A valid venue ID is required");
  }
  return `${NOROFF_API_URL}/holidaze/venues/${venueId}`;
}
