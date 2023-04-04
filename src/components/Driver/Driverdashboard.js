import React from "react";
import Table from "./DriverTable";
import Mainnav from "../MainDashboard/Mainnav";
const Dashboard = () => {
  return (
    <div>
      {/*=== DASHBOARD NAVBAR ===*/}
      <Mainnav />
      {/*=== DASHBOARD DRIVERS TABLE ===*/}
      <Table />
    </div>
  );
};

export default Dashboard;
