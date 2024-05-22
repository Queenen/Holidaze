import { useState, useEffect } from "react";
import styles from "./HeroSection.module.css";
import SearchBar from "../SearchBar";
import { fetchRandomVenueMedia } from "../../../../services/authService/GET/fetchSpecificVenues";
import LoadingError from "../../../../utils/LoadingError";

function HeroSection() {
  const [backgroundImage, setBackgroundImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBackgroundImage = async () => {
      setLoading(true);
      try {
        const mediaUrl = await fetchRandomVenueMedia();
        setBackgroundImage(mediaUrl);
      } catch (error) {
        setError("Error fetching background image: " + error.message);
      } finally {
        setLoading(false);
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
      <div
        className={
          !error ? `${styles.overlay}` : `${styles.overlay} ${styles.bgNone}`
        }
      >
        <SearchBar className="position-absolute p-5 top-0"></SearchBar>
        <h1 className="fs-5 fst-italic p-5 start-0 bottom-0 position-absolute">
          Find your perfect getaway ~
        </h1>
        <LoadingError loading={loading} error={error}></LoadingError>
      </div>
    </section>
  );
}

export default HeroSection;
