import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import logo from "../../asset/logo/Holidaze.png";

function Footer() {
  return (
    <footer
      className={`d-flex align-items-center justify-content-evenly p-3 px-md-5 ${styles.footer}`}
    >
      <p>
        © Holidaze 2024. <br className="d-sm-none" />
        All rights reserved
      </p>
      <Link to="/">
        <img src={logo} alt="holidaze logo" className={styles.logo} />
      </Link>
    </footer>
  );
}

export default Footer;
