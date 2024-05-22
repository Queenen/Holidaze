import { useState } from "react";
import styles from "./SearchBar.module.css";
import searchVenue from "../../../../services/authService/GET/searchVenues";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Input } from "../../../../components/Input";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  async function handleChange(event) {
    const query = event.target.value;
    setQuery(query);
    if (query.length > 2) {
      const venues = await searchVenue(query);
      setResults(venues.data || []);
    } else {
      setResults([]);
    }
  }

  function handleClear() {
    setQuery("");
    setResults([]);
  }

  return (
    <div
      className={`${styles.searchBar} ${
        results.length > 0 ? styles.resultsShowing : ""
      } w-100 position-absolute top-0 p-5`}
    >
      <div className="position-relative w-100">
        <Input
          type="search"
          placeholder={"Search for venues..."}
          value={query}
          onChange={handleChange}
          id="search-venues-input"
        />
        {query && (
          <FontAwesomeIcon
            icon={faTimes}
            className={styles.clearIcon}
            onClick={handleClear}
          />
        )}
      </div>
      {results.length > 0 && (
        <div className={`${styles.results} mx-5 rounded-bottom-5`}>
          <ul>
            {results.map((venue) => (
              <Link to={`/venue?id=${venue.id}`} key={venue.id}>
                <li>{venue.name}</li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
