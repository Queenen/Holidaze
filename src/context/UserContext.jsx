import React, { createContext, useContext, useReducer, useEffect } from "react";

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

  // Log the initial role on first render
  useEffect(() => {
    console.log("Initial role:", state.role);
  }, []);

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
