import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import styles from "./HeroSection.module.css";
import Button from "../../../../components/Button";
import { fetchUserByID } from "../../../../services/authService/GET/fetchSingleProfile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie, faUser } from "@fortawesome/free-solid-svg-icons";
import EditProfile from "../EditProfile";
import { useUserStatus } from "../../../../context/UserStatus";

function HeroSection() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    bio: "",
    avatarUrl: "",
    avatarAlt: "",
    bannerUrl: "",
    bannerAlt: "",
    venueManager: false,
  });
  const [showModal, setShowModal] = useState(false);

  const { isSignedIn } = useUserStatus();

  useEffect(() => {
    const loadUserData = async () => {
      const fetchedUser = await fetchUserByID();
      if (fetchedUser) {
        setUser({
          name: fetchedUser.name || "",
          email: fetchedUser.email || "",
          avatarUrl: fetchedUser.avatar.url || "",
          avatarAlt: fetchedUser.avatar.alt || "",
          bannerUrl: fetchedUser.banner.url || "",
          bannerAlt: fetchedUser.banner.alt || "",
          venueManager: fetchedUser.venueManager || false,
        });
      }
    };

    loadUserData();

    const handleSessionChange = () => {
      console.log("Detected session change, reloading user data");
      loadUserData();
    };

    window.addEventListener("sessionStorageChange", handleSessionChange);

    return () => {
      window.removeEventListener("sessionStorageChange", handleSessionChange);
    };
  }, [isSignedIn]);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <section className={styles.editProfile}>
      <div className={styles.profileMedia}>
        <div className={styles.banner}>
          <img src={user.bannerUrl} alt={user.bannerAlt} />
        </div>
        <div className={styles.profileImg}>
          <img src={user.avatarUrl} alt={user.avatarAlt} />
        </div>
      </div>
      <div className={styles.profileInfo}>
        <div className="d-flex align-items-center gap-2">
          {user.venueManager ? (
            <FontAwesomeIcon icon={faUserTie} />
          ) : (
            <FontAwesomeIcon icon={faUser} />
          )}
          <p className="bold">{user.name}</p>
        </div>
        <p>{user.email}</p>
        <div className={styles.editBtn}>
          <Button onClick={handleOpenModal}>Edit Profile</Button>
        </div>
      </div>
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        centered
        className={styles.modalContainer}
      >
        <EditProfile closeModal={handleCloseModal} />
      </Modal>
    </section>
  );
}

export default HeroSection;
