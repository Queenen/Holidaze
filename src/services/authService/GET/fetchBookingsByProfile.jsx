import { NOROFF_API_URL } from "../../config";
import createApiKey from "../../apiAuth";

// Function to ensure the API key is available
async function ensureApiKey() {
  if (!sessionStorage.getItem("apiKey")) {
    await createApiKey();
  }
  return sessionStorage.getItem("apiKey");
}

// Function to access all bookings by user profile
export async function fetchBookingsByProfile() {
  const userName = sessionStorage.getItem("userName");
  if (!userName) {
    console.error("No userName in sessionStorage.");
    return null;
  }

  const url = `${NOROFF_API_URL}/holidaze/profiles/${userName}/bookings`;
  const token = sessionStorage.getItem("accessToken");

  try {
    if (!token) {
      console.error("No access token available.");
      throw new Error(
        "You're not authorized to view this information. Please sign in and try again."
      );
    }

    const apiKey = await ensureApiKey();

    if (token && apiKey) {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": apiKey,
        },
      });

      if (!response.ok) {
        console.error(
          `Failed to fetch bookings by profile: ${response.status}`
        );
        throw new Error(
          `Failed to fetch bookings by profile: ${response.status}`
        );
      }

      const data = await response.json();
      if (data && data.data) {
        return data.data;
      } else {
        console.error("User data missing in the response:", data);
        return null;
      }
    }
  } catch (error) {
    console.error("Error fetching profile bookings info:", error);
    return null;
  }
}

/**
 * Example usage in a React component:
 *
 * import React, { useState, useEffect } from 'react';
 * import { fetchBookingsByProfile } from './path/to/fetchBookingsByProfile';
 *
 * const MyComponent = () => {
 *   const [bookings, setBookings] = useState(null);
 *
 *   useEffect(() => {
 *     const fetchData = async () => {
 *       const data = await fetchBookingsByProfile();
 *       console.log('Fetched Bookings:', data);
 *       setBookings(data);
 *     };
 *
 *     fetchData();
 *   }, []);
 *
 *   if (!bookings) {
 *     return <div>Loading...</div>;
 *   }
 *
 *   return (
 *     <div>
 *       <h1>My Bookings</h1>
 *       {bookings.map((booking) => (
 *         <div key={booking.id}>
 *           <p>ID: {booking.id}</p>
 *           <p>Check-in: {new Date(booking.dateFrom).toLocaleDateString()}</p>
 *           <p>Check-out: {new Date(booking.dateTo).toLocaleDateString()}</p>
 *           <p>Guests: {booking.guests}</p>
 *         </div>
 *       ))}
 *     </div>
 *   );
 * };
 *
 * export default MyComponent;
 */
