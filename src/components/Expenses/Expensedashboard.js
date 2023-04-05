import React from "react";
import ExpenseTable from "./ExpenseTable";
import Mainnav from "../MainDashboard/Mainnav";
import ComponentTable from "./ComponentTable";
const Expensedashboard = () => {
  return (
    <div>
      <Mainnav />
      <ComponentTable />
    </div>
  );
};

export default Expensedashboard;
