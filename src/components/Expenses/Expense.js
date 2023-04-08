import React from "react";
import Expenseform from "./Expenseform";
import Mainnav from "../MainDashboard/Mainnav";
const Expense = () => {
  return (
    <div>
      {/* NAVBAR */}
      <Mainnav />
      {/* EXPENSE FORM */}
      <Expenseform />
    </div>
  );
};

export default Expense;
