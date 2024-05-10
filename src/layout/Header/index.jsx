import React, { useState } from "react";
import { Container, Navbar, Nav, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faBars,
  faSignOutAlt,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink } from "react-router-dom";
import logo from "../../asset/logo/Holidaze_Logo.png";
import SignIn from "../../components/SignIn";
import SignUp from "../../components/SignUp";
import { useUserContext } from "../../context/UserContext";
import styles from "./Header.module.css";
import AddVenueModal from "./components/AddVenueModal";

const Header = () => {
  const { role, setGuest } = useUserContext();
  const [showModal, setShowModal] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showAddVenueModal, setShowAddVenueModal] = useState(false);
  const userName = sessionStorage.getItem("userName");

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
        <Navbar expand="md" collapseOnSelect className="w-100">
          <Container className={`d-flex p-0 gap-4 ${styles.container}`}>
            <Navbar.Brand as={Link} to="/">
              <img src={logo} alt="Holidaze logo" className={styles.logo} />
            </Navbar.Brand>
            <button
              className="btn order-md-1 ms-auto"
              onClick={handleSignInOutClick}
            >
              <FontAwesomeIcon
                icon={role !== "guest" ? faSignOutAlt : faSignInAlt}
                className="me-3"
              />
              {role !== "guest" ? "Sign Out" : "Sign In"}
            </button>
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              className={styles.toggleBtn}
            >
              <FontAwesomeIcon icon={faBars} />
            </Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav
                className={`me-auto order-md-0 text-center gap-md-4 ${styles.navLinks}`}
              >
                {role === "venue manager" && (
                  <button
                    className="nav-link p-0 border-0 bg-transparent py-2 p-md-2"
                    onClick={toggleAddVenueModal}
                  >
                    <FontAwesomeIcon icon={faCirclePlus} className="me-2" />
                    Add venue
                  </button>
                )}
                <Nav.Link as={NavLink} to="/venues">
                  All Venues
                </Nav.Link>
                {(role === "customer" || role === "venue manager") && (
                  <Nav.Link as={NavLink} to={`/profile?name=${userName}`}>
                    Profile
                  </Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
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
