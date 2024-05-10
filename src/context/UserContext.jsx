import React, { createContext, useContext, useReducer, useEffect } from "react";

// Initial state with role and login status
const initialState = {
  role: "guest", // Default role
  isLoggedIn: false, // Track if the user is logged in
};

// Action types to manage user roles and login status
const actionTypes = {
  SET_GUEST: "SET_GUEST",
  SET_CUSTOMER: "SET_CUSTOMER",
  SET_MANAGER: "SET_MANAGER",
  SET_LOGIN_STATUS: "SET_LOGIN_STATUS", // Action to manage login status
};

// Create context
const UserContext = createContext(initialState);

// Reducer function to manage state changes
function userReducer(state, action) {
  switch (action.type) {
    case actionTypes.SET_GUEST:
      return { ...state, role: "guest", isLoggedIn: false };
    case actionTypes.SET_CUSTOMER:
      return { ...state, role: "customer", isLoggedIn: true };
    case actionTypes.SET_MANAGER:
      return { ...state, role: "venue manager", isLoggedIn: true };
    case actionTypes.SET_LOGIN_STATUS:
      return { ...state, isLoggedIn: action.payload };
    default:
      return state;
  }
}

// Context Provider component to wrap application parts that need this context
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  // Functions to update roles and login status
  const setGuest = () => {
    console.log("Setting role to guest");
    dispatch({ type: actionTypes.SET_GUEST });
  };
  const setCustomer = () => {
    console.log("Setting role to customer");
    dispatch({ type: actionTypes.SET_CUSTOMER });
  };
  const setManager = () => {
    console.log("Setting role to venue manager");
    dispatch({ type: actionTypes.SET_MANAGER });
  };
  const setLoginStatus = (status) => {
    console.log("Setting login status:", status);
    dispatch({ type: actionTypes.SET_LOGIN_STATUS, payload: status });
  };

  // Effect to detect changes in session storage and update the user role accordingly
  useEffect(() => {
    const checkSession = () => {
      if (!sessionStorage.getItem("accessToken")) {
        setGuest(); // Set to guest if no access token is found
      } else {
        const role = sessionStorage.getItem("userRole");
        if (role === "venue manager") {
          setManager();
        } else {
          setCustomer();
        }
      }
    };

    checkSession();
    // Listen for changes in sessionStorage to dynamically update the role
    window.addEventListener("storage", checkSession);
    return () => window.removeEventListener("storage", checkSession);
  }, []);

  return (
    <UserContext.Provider
      value={{ ...state, setGuest, setCustomer, setManager, setLoginStatus }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUserContext = () => useContext(UserContext);
