import React, { createContext, useContext, useEffect, useState } from "react";
import { useUserStatus } from "./UserStatus";

const UserRoleContext = createContext();

export const UserRoleProvider = ({ children }) => {
  const { isSignedIn } = useUserStatus();
  const [role, setRole] = useState("guest");

  useEffect(() => {
    if (!isSignedIn) {
      setRole("guest");
    } else {
      const isManager = sessionStorage.getItem("venueManager") === "true";
      setRole(isManager ? "manager" : "customer");
    }
  }, [isSignedIn]);

  return (
    <UserRoleContext.Provider value={{ role }}>
      {children}
    </UserRoleContext.Provider>
  );
};

export const useUserRole = () => useContext(UserRoleContext);
