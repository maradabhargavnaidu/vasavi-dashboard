import React from "react";
import Mainnav from "../MainDashboard/Mainnav";
import ComponentTable from "./ComponentTable";
const Expensedashboard = () => {
  return (
    <div>
      {/* NAVBAR */}
      <Mainnav />
      {/* DATA TABLE COMPONENT */}
      <ComponentTable />
    </div>
  );
};

export default Expensedashboard;
