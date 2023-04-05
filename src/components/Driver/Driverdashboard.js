import React from "react";
import Table from "./DriverTable";
import DrComponent from "./DrComponent";
import Mainnav from "../MainDashboard/Mainnav";
const Dashboard = () => {
  return (
    <div>
      {/*=== DASHBOARD NAVBAR ===*/}
      <Mainnav />
      {/*=== DASHBOARD DRIVERS TABLE ===*/}
      <DrComponent />
    </div>
  );
};

export default Dashboard;
