import { useState } from "react";
import { Input } from "../../../../components/Input";
import searchVenue from "../../../../services/authService/GET/searchVenues";
import styles from "./SearchBar.module.css";
import { Link } from "react-router-dom";

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

  return (
    <div className={` ${styles.searchBar} w-100 position-absolute top-0 p-5`}>
      <Input
        type="search"
        placeholder={"Search for venues..."}
        value={query}
        onChange={handleChange}
        className={`${styles.input} form-control rounded-5 m-0 w-100 ${
          results.length > 0 ? styles.resultsShowing : ""
        }`}
      />
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
