import React from "react";
import Mainnav from "../MainDashboard/Mainnav";
import BusComponent from "./BusComponent";
const Busdashboard = () => {
  return (
    <div>
      {/* NAVBAR */}
      <Mainnav />
      {/* TABLE OF BUS */}
      <BusComponent />
    </div>
  );
};

export default Busdashboard;
