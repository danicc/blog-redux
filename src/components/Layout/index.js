import React from "react";

import Header from "../Header";

import "./styles.css";

function Layout({ children }) {
  return (
    <div className="container">
      <Header />
      {children}
    </div>
  );
}

export default Layout;
