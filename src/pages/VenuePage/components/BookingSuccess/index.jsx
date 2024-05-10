import styles from "./BookingSuccess.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons";
import { fetchUserByID } from "../../../../services/authService/GET/fetchSingleProfile";

function BookingSuccess() {
  const userName = sessionStorage.getItem("userName");

  if (!userName) {
    fetchUserByID();
  }

  return (
    <section
      className={`p-5 d-flex justify-content-center ${styles.bookingSection}`}
    >
      <div
        className={`d-flex flex-column gap-3 w-100 ${styles.bookingSuccess}`}
      >
        <div className="d-flex gap-3 mb-3 align-items-center">
          <h1>Venue booked</h1>
          <FontAwesomeIcon icon={faCalendarPlus} className={styles.icon} />
        </div>
        <p>
          You have successfully booked the venue! You may view your booking{" "}
          <Link to={`/profile?name=${userName}`}>here</Link>.
        </p>
        <p className="fst-italic">We hope you will enjoy your stay!</p>
      </div>
    </section>
  );
}

export default BookingSuccess;
