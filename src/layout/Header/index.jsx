import React, { useState, useEffect } from "react";
import { Container, Navbar, Nav, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faBars,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../asset/logo/Holidaze_Logo.png";
import SignIn from "../../components/SignIn";
import SignUp from "../../components/SignUp";
import styles from "./Header.module.css";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const accessToken = sessionStorage.getItem("accessToken");
      setIsLoggedIn(!!accessToken);
    };

    checkLoginStatus();
  }, []);

  const handleSignInOutClick = () => {
    if (isLoggedIn) {
      sessionStorage.clear();
      setIsLoggedIn(false);
    } else {
      setShowModal(true);
      setShowSignUp(false);
    }
  };

  const toggleSignUp = () => {
    setShowSignUp(!showSignUp);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <header
      className={`d-flex align-items-center p-3 px-md-5 ${styles.header}`}
    >
      <Navbar expand="md" collapseOnSelect className="w-100">
        <Container className={`d-flex p-0 gap-4 ${styles.container}`}>
          <Navbar.Brand href="/">
            <img src={logo} alt="Holidaze logo" className={styles.logo} />
          </Navbar.Brand>
          <button
            className="btn order-md-1 ms-auto"
            onClick={handleSignInOutClick}
          >
            <FontAwesomeIcon
              className="me-3"
              icon={isLoggedIn ? faSignOutAlt : faSignInAlt}
            />
            {isLoggedIn ? "Sign Out" : "Sign In"}
          </button>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className={styles.toggleBtn}
          >
            <FontAwesomeIcon icon={faBars} />
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav
              className={`me-auto order-md-0 text-center ${styles.navLinks}`}
            >
              <Nav.Link href="/venues">All Venues</Nav.Link>
              {isLoggedIn && <Nav.Link href="/profile">Profile</Nav.Link>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        {showSignUp ? (
          <SignUp closeModal={handleCloseModal} onToggleAuth={toggleSignUp} />
        ) : (
          <SignIn
            closeModal={handleCloseModal}
            onToggleAuth={toggleSignUp}
            setIsLoggedIn={setIsLoggedIn}
          />
        )}
      </Modal>
    </header>
  );
};

export default Header;
