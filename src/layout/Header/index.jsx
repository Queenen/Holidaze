import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import SignIn from "../../components/SignIn";
import SignUp from "../../components/SignUp";
import styles from "./Header.module.css";
import AddVenueModal from "./components/AddVenueModal";
import { useUserContext } from "../../context/UserContext";
import NavBar from "./components/NavBar";

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showAddVenueModal, setShowAddVenueModal] = useState(false);
  const { role, setGuest } = useUserContext();

  const handleSignInOutClick = () => {
    if (role !== "guest") {
      sessionStorage.clear();
      setGuest();
    } else {
      setShowModal(true);
      setShowSignUp(false);
    }
  };

  const toggleSignUp = () => setShowSignUp(!showSignUp);
  const handleCloseModal = () => setShowModal(false);
  const toggleAddVenueModal = () => setShowAddVenueModal(!showAddVenueModal);
  const closeAddVenueModal = () => setShowAddVenueModal(false);

  return (
    <>
      <div className={styles.space}></div>
      <header
        className={`d-flex align-items-center p-3 px-md-5 ${styles.header}`}
      >
        <NavBar
          handleSignInOutClick={handleSignInOutClick}
          toggleAddVenueModal={toggleAddVenueModal}
        />
        <Modal show={showModal} onHide={handleCloseModal} centered>
          {showSignUp ? (
            <SignUp closeModal={handleCloseModal} onToggleAuth={toggleSignUp} />
          ) : (
            <SignIn closeModal={handleCloseModal} onToggleAuth={toggleSignUp} />
          )}
        </Modal>
        {showAddVenueModal && <AddVenueModal closeModal={closeAddVenueModal} />}
      </header>
    </>
  );
};

export default Header;
