import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { UserStatusProvider } from "./context/UserStatus";
import { UserRoleProvider } from "./context/UserRole";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserStatusProvider>
        <UserRoleProvider>
          <App />
        </UserRoleProvider>
      </UserStatusProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
