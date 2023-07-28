import React from "react";
import { useState } from "react";
import {
  Outlet, Link
} from "react-router-dom";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTab1 = () => {
    setActiveTab("tab1");
  };

  const handleTab2 = () => {
    setActiveTab("tab2");
  };

  return (
    <div className="Tabs">
      <ul className="nav">
        <li
          className={activeTab === "tab1" ? "active" : ""}
          onClick={handleTab1}
        >
          <Link to="/micro">Home</Link>
          {/* Tab Home */}
        </li>
        <li
          className={activeTab === "tab2" ? "active" : ""}
          onClick={handleTab2}
        >
          <Link to="page-a">PageA</Link>
          {/* Tab 1 */}
        </li>
      </ul>
      <Outlet />
      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
    </div>
  );
};
export default Tabs;