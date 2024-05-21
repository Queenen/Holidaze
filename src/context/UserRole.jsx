import React, { createContext, useContext, useEffect, useState } from "react";
import { UserStatusContext } from "./UserStatus";

const UserRoleContext = createContext();

export const UserRoleProvider = ({ children }) => {
  const { isSignedIn } = useContext(UserStatusContext);
  const [role, setRole] = useState("guest");

  useEffect(() => {
    const handleRoleChange = () => {
      if (!isSignedIn) {
        setRole("guest");
      } else {
        const isManager = sessionStorage.getItem("venueManager") === "true";
        setRole(isManager ? "manager" : "customer");
      }
    };

    handleRoleChange();
    window.addEventListener("sessionStorageChange", handleRoleChange);

    return () => {
      window.removeEventListener("sessionStorageChange", handleRoleChange);
    };
  }, [isSignedIn]);

  return (
    <UserRoleContext.Provider value={{ role }}>
      {children}
    </UserRoleContext.Provider>
  );
};

export const useUserRole = () => useContext(UserRoleContext);
