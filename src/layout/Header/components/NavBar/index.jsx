import React, { useState, useRef, useEffect } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faSignOutAlt,
  faCirclePlus,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink } from "react-router-dom";
import { useUserStatus } from "../../../../context/UserStatus";
import { useUserRole } from "../../../../context/UserRole";
import logo from "../../../../asset/logo/Holidaze.png";
import styles from "./NavBar.module.css";

function NavBar({ handleSignInOutClick, toggleAddVenueModal }) {
  const { isSignedIn } = useUserStatus();
  const { role } = useUserRole();
  const userName = sessionStorage.getItem("userName");
  const [expanded, setExpanded] = useState(false);
  const navbarRef = useRef(null);

  const toggleNavbar = () => setExpanded(!expanded);
  const closeNavbar = () => setExpanded(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        closeNavbar();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navbarRef]);

  return (
    <Navbar
      expand="md"
      collapseOnSelect
      expanded={expanded}
      className="w-100"
      ref={navbarRef}
    >
      <Container className={`d-flex p-0 gap-1 ${styles.container}`}>
        <Navbar.Brand as={Link} to="/" onClick={closeNavbar}>
          <img src={logo} alt="Holidaze logo" className={styles.logo} />
        </Navbar.Brand>

        <button
          className="btn order-md-1 ms-auto defaultFont"
          onClick={() => {
            handleSignInOutClick();
            closeNavbar();
          }}
        >
          <FontAwesomeIcon
            icon={isSignedIn ? faSignOutAlt : faSignInAlt}
            className="me-3"
          />
          {isSignedIn ? "Sign Out" : "Sign In"}
        </button>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className={styles.toggleBtn}
          onClick={toggleNavbar}
        >
          <FontAwesomeIcon icon={faBars} />
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className={`me-auto order-md-0 text-center gap-md-3`}
            onClick={closeNavbar}
          >
            {role === "manager" && (
              <button
                className="nav-link p-0 border-0 bg-transparent py-2 p-md-2 defaultFont"
                onClick={() => {
                  toggleAddVenueModal();
                  closeNavbar();
                }}
              >
                <FontAwesomeIcon icon={faCirclePlus} className="me-2" />
                Add Venue
              </button>
            )}
            <Nav.Link as={NavLink} to="/venues" className="defaultFont">
              All Venues
            </Nav.Link>
            {isSignedIn && (
              <Nav.Link
                as={NavLink}
                to={`/profile?name=${userName}`}
                className="defaultFont"
              >
                Profile
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
