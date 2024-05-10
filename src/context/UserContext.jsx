import React, { createContext, useContext, useReducer, useEffect } from "react";
import { useLocation } from "react-router-dom";

// Define the initial state and roles
const initialState = {
  role: "guest",
};

// Define the actions for role changes
const actionTypes = {
  SET_GUEST: "SET_GUEST",
  SET_CUSTOMER: "SET_CUSTOMER",
  SET_MANAGER: "SET_MANAGER",
};

const UserContext = createContext(initialState);

// Reducer to manage role changes
function userReducer(state, action) {
  switch (action.type) {
    case actionTypes.SET_GUEST:
      return { ...state, role: "guest" };
    case actionTypes.SET_CUSTOMER:
      return { ...state, role: "customer" };
    case actionTypes.SET_MANAGER:
      return { ...state, role: "venue manager" };
    default:
      return state;
  }
}

// Context Provider component
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const location = useLocation();

  // Functions to change roles with logging
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

  // Check session on navigation and initial load
  useEffect(() => {
    const checkSession = () => {
      if (!sessionStorage.getItem("accessToken")) {
        setGuest();
        console.log("Session expired or wiped. User set to guest.");
      }
    };

    checkSession();
  }, [location]);

  return (
    <UserContext.Provider
      value={{ ...state, setGuest, setCustomer, setManager }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use user context
export const useUserContext = () => useContext(UserContext);
