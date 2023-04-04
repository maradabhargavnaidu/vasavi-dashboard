import React from "react";
import Infoform from "./Infoform";
import Mainnav from "../MainDashboard/Mainnav";
const User = () => {
  return (
    <div>
      {/*=== INFORMATION NAVBAR ===*/}
      <Mainnav />
      {/*=== INFORMATION FORM ===*/}
      <Infoform />
    </div>
  );
};

export default User;
