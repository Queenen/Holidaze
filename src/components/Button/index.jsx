import styles from "./Button.module.css";

function Button({ children }) {
  return (
    <>
      <button
        className={`btn rounded-5 text-white fw-bold text-uppercase px-4 ${styles.button}`}
      >
        {children}
      </button>
    </>
  );
}

export default Button;
