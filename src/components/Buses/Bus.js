import React from "react";
import Mainnav from "../MainDashboard/Mainnav";
import Busform from "./Busform";
const Bus = () => {
  return (
    <div>
      {/*=== NAVBAR ===*/}
      <Mainnav />
      {/*=== ADDING FORM ==*/}
      <Busform />
    </div>
  );
};

export default Bus;
