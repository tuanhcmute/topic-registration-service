import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

function MainLayout({ children }) {
  return (
    <div>
      <Sidebar />
      <div>
        <Header />
        {children}
      </div>
    </div>
  );
}

export default MainLayout;
