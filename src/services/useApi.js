import { useState, useEffect } from "react";

const useApi = (apiFunction, params) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await apiFunction(...params);
        setData(result.data);
      } catch (error) {
        if (error.response) {
          const status = error.response.status;
          if (status === 404) {
            setErrorMessage("Resource not found.");
          } else if (status === 401) {
            setErrorMessage("Unauthorized access. Please log in.");
          } else if (status === 500) {
            setErrorMessage("Internal server error.");
          } else if (status === 403) {
            setErrorMessage(
              "Forbidden access. You do not have the right permissions."
            );
          } else {
            setErrorMessage(`Error: ${status}`);
          }
        } else if (error.request) {
          setErrorMessage(
            "Network error. Please check your internet connection."
          );
        } else {
          setErrorMessage(
            "Error setting up the request. Please try again later."
          );
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [apiFunction, ...params]);

  return { data, loading, errorMessage };
};

export default useApi;
