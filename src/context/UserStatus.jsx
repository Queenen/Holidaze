import React, { createContext, useContext, useEffect, useState } from "react";

const UserStatusContext = createContext();

// Helper function to broadcast session changes within the app
function broadcastSessionChange() {
  const event = new Event("sessionStorageChange");
  window.dispatchEvent(event);
}

export const UserStatusProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(
    !!sessionStorage.getItem("accessToken")
  );

  useEffect(() => {
    const handleSessionChange = () => {
      // Update isSignedIn based on the presence of 'accessToken' in sessionStorage
      setIsSignedIn(!!sessionStorage.getItem("accessToken"));
    };

    // Custom event listener to handle session changes within the same tab
    window.addEventListener("sessionStorageChange", handleSessionChange);

    // Built-in storage event listener to handle changes from other tabs
    window.addEventListener("storage", (event) => {
      if (event.key === "accessToken") {
        handleSessionChange();
      }
    });

    return () => {
      window.removeEventListener("sessionStorageChange", handleSessionChange);
      window.removeEventListener("storage", handleSessionChange);
    };
  }, []);

  return (
    <UserStatusContext.Provider value={{ isSignedIn, broadcastSessionChange }}>
      {children}
    </UserStatusContext.Provider>
  );
};

export const useUserStatus = () => useContext(UserStatusContext);
