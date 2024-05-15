import HeroSection from "./components/HeroSection";
import Bio from "./components/Bio";
import MyVenues from "./components/MyVenues";
import MyBookings from "./components/MyBookings";
import { useEffect, useState } from "react";
import { fetchUserByID } from "../../services/authService/GET/fetchSingleProfile";

function ProfilePage() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    bio: "",
    avatarUrl: "",
    avatarAlt: "",
    bannerUrl: "",
    bannerAlt: "",
    venueManager: false,
    venues: "",
    bookings: "",
  });

  useEffect(() => {
    const loadUserData = async () => {
      const fetchedUser = await fetchUserByID();
      if (fetchedUser) {
        setUser({
          name: fetchedUser.name || "",
          email: fetchedUser.email || "",
          bio:
            fetchedUser.bio ||
            "There's no bio yet, please edit your profile to add one.",
          avatarUrl: fetchedUser.avatar.url || "",
          avatarAlt: fetchedUser.avatar.alt || "",
          bannerUrl: fetchedUser.banner.url || "",
          bannerAlt: fetchedUser.banner.alt || "",
          venueManager: fetchedUser.venueManager || false,
          venues: fetchedUser.venues || {},
          bookings: fetchedUser.bookings || {},
        });
      }
    };

    loadUserData();
  }, []);

  return (
    <>
      <div className="d-md-flex flex-wrap">
        <div className="d-md-flex flex-column col-md-6">
          <HeroSection user={user} />
          <Bio bio={user.bio} />
        </div>
        <div className="d-md-flex flex-column col-md-6">
          <MyVenues user={user} />
          <MyBookings user={user} />
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
