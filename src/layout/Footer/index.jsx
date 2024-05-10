import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import logo from "../../asset/logo/Holidaze_Logo.png";

function Footer() {
  return (
    <>
      <footer
        className={`d-flex align-items-center justify-content-evenly p-3 px-md-5 ${styles.footer}`}
      >
        <p className="d-flex align-self-end mb-4 small">
          © Holidaze 2024. All rights reserved
        </p>
        <Link to="/">
          <img src={logo} alt="holidaze logo" className={styles.logo} />
        </Link>
      </footer>
    </>
  );
}

export default Footer;
