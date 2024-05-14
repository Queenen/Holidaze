import styles from "./Bio.module.css";

function Bio(props) {
  const { bio } = props;
  return (
    <section
      className={`${styles.bioSection} p-5 d-flex justify-content-center`}
    >
      <div>
        <h1 className="mb-4 fs-2">Biography</h1>
        <p>{bio}</p>
      </div>
    </section>
  );
}

export default Bio;
