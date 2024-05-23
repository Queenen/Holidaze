import React, { useEffect, useState } from "react";
import HeroSection from "./components/HeroSection";
import Bio from "./components/Bio";
import MyVenues from "./components/MyVenues";
import MyBookings from "./components/MyBookings";
import { fetchUserByID } from "../../services/authService/GET/fetchSingleProfile";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import LoadingError from "../../utils/LoadingError";

function ProfilePage() {
  useDocumentTitle("Holidaze | Profile");
  const [user, setUser] = useState({
    name: "",
    email: "",
    bio: "",
    avatarUrl: "",
    avatarAlt: "",
    bannerUrl: "",
    bannerAlt: "",
    venueManager: false,
    venues: [],
    bookings: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadUserData = async () => {
    setLoading(true);
    try {
      const fetchedUser = await fetchUserByID();
      if (fetchedUser) {
        setUser({
          name: fetchedUser.name || "Undefined",
          email: fetchedUser.email || "Undefined",
          bio: fetchedUser.bio || "",
          avatarUrl: fetchedUser.avatar.url || "",
          avatarAlt: fetchedUser.avatar.alt || "",
          bannerUrl: fetchedUser.banner.url || "",
          bannerAlt: fetchedUser.banner.alt || "",
          venueManager: fetchedUser.venueManager || false,
          venues: fetchedUser.venues || [],
          bookings: fetchedUser.bookings || [],
        });
      }
    } catch (error) {
      setError("Error fetching user data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserData();
    window.addEventListener("sessionStorageChange", loadUserData);

    return () => {
      window.removeEventListener("sessionStorageChange", loadUserData);
    };
  }, []);

  return (
    <div className="d-md-flex flex-wrap">
      <div className="d-md-flex flex-column col-md-6">
        <LoadingError loading={loading} error={error}>
          <HeroSection user={user} />
        </LoadingError>
        <LoadingError loading={loading} error={error}>
          <Bio bio={user.bio} />
        </LoadingError>
      </div>
      <div className="d-md-flex flex-column col-md-6">
        {user.venueManager && <MyVenues user={user} />}
        <MyBookings user={user} />
      </div>
    </div>
  );
}

export default ProfilePage;
