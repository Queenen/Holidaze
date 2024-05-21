import styles from "./NotFound.module.css";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const NotFoundPage = () => {
  useDocumentTitle("Holidaze | Not Found");
  return (
    <div
      className={`d-flex flex-column justify-content-center align-items-center ${styles.all}`}
    >
      <div
        className={`p-5 text-center d-flex flex-column gap-4 ${styles.content}`}
      >
        <h1 className="text-danger fw-bold">404 - Not Found</h1>
        <p>The page you are looking for does not exist. ☹</p>
        <Link to="/" className="mt-4 w-100">
          <Button>Return Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
