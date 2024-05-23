import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import searchVenue from "../../../../services/authService/GET/searchVenues";
import { Input } from "../../../../components/Input";
import styles from "./SearchBar.module.css";
import TextTruncate from "../../../../components/TextTruncate";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleChange = async (event) => {
    const query = event.target.value;
    setQuery(query);
    if (query.length > 2) {
      try {
        const response = await searchVenue(query);
        setResults(response.data || []);
      } catch (error) {
        console.error("Error searching venues:", error);
      }
    } else {
      setResults([]);
    }
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
  };

  return (
    <div
      className={`${styles.searchBar} ${
        results.length > 0 ? styles.resultsShowing : ""
      } w-100 position-absolute top-0 p-5`}
    >
      <div className="position-relative w-100">
        <Input
          type="search"
          placeholder="Search for venues..."
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
                <li>
                  <TextTruncate text={venue.name} useMaxLength maxLength={30} />
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
