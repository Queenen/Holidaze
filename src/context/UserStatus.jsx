import React, { createContext, useContext, useEffect, useState } from "react";

const UserStatusContext = createContext();

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
      setIsSignedIn(!!sessionStorage.getItem("accessToken"));
    };

    window.addEventListener("sessionStorageChange", handleSessionChange);
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

export { UserStatusContext };
