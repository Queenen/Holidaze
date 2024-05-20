import styles from "./HeroSection.module.css";
import { useState, useEffect } from "react";
import SearchBar from "../SearchBar";
import { fetchRandomVenueMedia } from "../../../../services/authService/GET/fetchSpecificVenues";

function HeroSection() {
  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    const getBackgroundImage = async () => {
      try {
        const mediaUrl = await fetchRandomVenueMedia();
        setBackgroundImage(mediaUrl);
      } catch (error) {
        console.error("Error fetching background image:", error);
      }
    };

    getBackgroundImage();
  }, []);

  return (
    <section
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        width: "100%",
        backgroundPosition: "center",
        height: "20rem",
        position: "relative",
      }}
    >
      <div className={`${styles.overlay}`}>
        <SearchBar className="position-absolute p-5 top-0"></SearchBar>
        <h1 className="fs-5 fst-italic p-5 start-0 bottom-0 position-absolute">
          Find your perfect getaway ~
        </h1>
      </div>
    </section>
  );
}

export default HeroSection;
