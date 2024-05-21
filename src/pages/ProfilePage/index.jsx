import React, { useEffect, useState } from "react";
import HeroSection from "./components/HeroSection";
import Bio from "./components/Bio";
import MyVenues from "./components/MyVenues";
import MyBookings from "./components/MyBookings";
import { fetchUserByID } from "../../services/authService/GET/fetchSingleProfile";
import { useUserRole } from "../../context/UserRole";
import useDocumentTitle from "../../hooks/useDocumentTitle";

function ProfilePage() {
  useDocumentTitle("Holidaze | Profile");
  const { role } = useUserRole();
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

  const loadUserData = async () => {
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
        <HeroSection user={user} />
        <Bio bio={user.bio} />
      </div>
      <div className="d-md-flex flex-column col-md-6">
        {role === "manager" && <MyVenues user={user} />}
        <MyBookings user={user} />
      </div>
    </div>
  );
}

export default ProfilePage;
