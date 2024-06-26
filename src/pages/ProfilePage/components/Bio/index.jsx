import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import styles from "./Bio.module.css";

function Bio({ bio }) {
  return (
    <section
      className={`${styles.bioSection} p-5 d-flex justify-content-center align-items-center`}
    >
      <div className={styles.bioContent}>
        <h1 className="mb-5 fs-2 seasons fw-semibold">Biography</h1>
        {bio ? (
          <p className="text-break">{bio}</p>
        ) : (
          <p className="text-danger">
            <FontAwesomeIcon
              icon={faCircleExclamation}
              color="red"
              className="me-1"
            />
            There's no bio yet, please edit your profile to add one.
          </p>
        )}
      </div>
    </section>
  );
}

export default Bio;
