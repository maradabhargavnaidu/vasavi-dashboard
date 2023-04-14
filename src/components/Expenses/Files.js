import React, { useState } from "react";
import Mainnav from "../MainDashboard/Mainnav";
import { storage } from "../../firebase-config";
import { getDownloadURL, ref, listAll } from "firebase/storage";
import { useParams } from "react-router-dom";

const Files = () => {
  const { fileURL } = useParams();

  return (
    <div>
      <Mainnav />
      return (
      <embed
        type="application/pdf"
        width="300px"
        height="300px"
        className="float-right"
      />
      );
    </div>
  );
};

export default Files;
