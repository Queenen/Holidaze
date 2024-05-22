import { useState, useEffect } from "react";
import styles from "./HeroSection.module.css";
import SearchBar from "../SearchBar";
import { fetchRandomVenueMedia } from "../../../../services/authService/GET/fetchSpecificVenues";
import LoadingError from "../../../../utils/LoadingError";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane } from "@fortawesome/free-solid-svg-icons";

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
      <div className={`${styles.overlay} ${error ? styles.bgNone : ""}`}>
        <SearchBar className="position-absolute p-5 top-0" />
        <h1 className="fs-5 fst-italic p-5 start-0 bottom-0 position-absolute defaultFont d-flex gap-3">
          Find your perfect getaway
          <span>
            <FontAwesomeIcon icon={faPlane} />
          </span>
        </h1>
        <LoadingError loading={loading} error={error} />
      </div>
    </section>
  );
}

export default HeroSection;
